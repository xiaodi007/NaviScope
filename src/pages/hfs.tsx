import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import SupplyAssetTable from "../components/SupplyAssetTable";
import BorrowAssetTable from "../components/BorrowAssetTable";
import HealthFactorSimulation from "../components/HealthFactorSimulation";
import { AssetData, SupplyData, BorrowData } from "../types";
import ltvData from "../assets/assets_ltv.json";
import liquidationThresholdData from "../assets/assets_liquidation_threshold.json";

const HFSimulation = () => {
  const { t } = useTranslation("hfs");

  const [assets, setAssets] = useState<AssetData[]>([]);
  const [supplyData, setSupplyData] = useState<SupplyData | null>(null);
  const [borrowData, setBorrowData] = useState<BorrowData | null>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get("/api/getIndexAssetData");
        const data = response.data;
        const assetsArray: AssetData[] = [];

        for (let key in data) {
          const asset = data[key];
          assetsArray.push({
            symbol: asset.symbol,
            price: parseFloat(asset.price),
            supply_rate: parseFloat(asset.supply_rate),
            boosted: parseFloat(asset.boosted),
            borrow_rate: parseFloat(asset.borrow_rate),
            borrow_reward_apy: parseFloat(asset.borrow_reward_apy),
            max_ltv: ltvData[asset.symbol] || 0,
            liquidation_threshold: liquidationThresholdData[asset.symbol] || 0, // 添加清算阈值
          });
        }

        setAssets(assetsArray);
      } catch (error) {
        console.error("Error fetching asset data:", error);
      }
    };

    fetchAssets();
  }, []);

  const handleSupplyChange = (data: SupplyData) => {
    setSupplyData(data);
  };

  const handleBorrowChange = (data: BorrowData) => {
    setBorrowData(data);
  };

  const totalCollateralValue = supplyData?.totalCollateralValue || 0;
  const totalLoanableValue = supplyData?.totalLoanableValue || 0;
  const totalBorrowValue = borrowData?.totalBorrowValue || 0;

  if (assets.length === 0) {
    return <div>{t("loading_assets")}</div>;
  }

  return (
    <div className="min-h-screen bg-darkBackground text-white p-10">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>
      <SupplyAssetTable assets={assets} onSupplyChange={handleSupplyChange} />
      {supplyData && (
        <BorrowAssetTable
          assets={assets}
          totalLoanableValue={totalLoanableValue}
          onBorrowChange={handleBorrowChange}
          supplyData={supplyData}
        />
      )}
      {supplyData && borrowData && (
        <HealthFactorSimulation
          totalCollateralValue={totalCollateralValue}
          totalBorrowValue={totalBorrowValue}
          supplyAssets={supplyData.inputAmounts}
          borrowAssets={borrowData.inputAmounts}
          assets={assets} // 传递资产数据
        />
      )}
    </div>
  );
};

export default HFSimulation;
