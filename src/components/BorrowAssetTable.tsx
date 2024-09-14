import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import {
  AssetData,
  InputAmounts,
  BorrowData,
  BorrowAssetTableProps,
} from "../types";

const BorrowAssetTable: React.FC<BorrowAssetTableProps> = ({
  assets,
  totalLoanableValue,
  onBorrowChange,
  supplyData,
}) => {
  const { t } = useTranslation('BorrowAssetTable');
  const [inputAmounts, setInputAmounts] = useState<InputAmounts>({});
  const [totalBorrowValue, setTotalBorrowValue] = useState<number>(0);

  const handleAmountChange = (
    symbol: string,
    field: "amount" | "value",
    input: number
  ) => {
    const asset = assets.find((a) => a.symbol === symbol);
    if (!asset) return;

    const newInputAmounts = { ...inputAmounts };
    const currentData = newInputAmounts[symbol] || { amount: 0, value: 0 };

    if (field === "amount") {
      const value = input * asset.price;
      currentData.amount = input;
      currentData.value = value;
    } else {
      const amount = input / asset.price;
      currentData.value = input;
      currentData.amount = amount;
    }

    newInputAmounts[symbol] = currentData;
    setInputAmounts(newInputAmounts);

    // 计算总借出价值
    let borrowValue = 0;

    assets.forEach((asset) => {
      const data = newInputAmounts[asset.symbol];
      if (data) {
        borrowValue += data.value;
      }
    });

    setTotalBorrowValue(borrowValue);

    // 将数据传递给父组件
    const borrowData: BorrowData = {
      inputAmounts: newInputAmounts,
      totalBorrowValue: borrowValue,
    };
    onBorrowChange(borrowData);
  };
  // 计算健康因子
  const calculateHealthFactor = () => {
    if (!supplyData || !supplyData.inputAmounts) {
      // 如果 supplyData 或 inputAmounts 未定义，返回一个默认值，如 Infinity
      return Infinity;
    }
  
    let totalCollateralThreshold = 0;
  
    assets.forEach(asset => {
      const supplyAmount = supplyData.inputAmounts[asset.symbol]?.amount || 0;
      const supplyValue = supplyAmount * asset.price;
      const liquidationThreshold = asset.liquidation_threshold;
  
      totalCollateralThreshold += supplyValue * liquidationThreshold;
    });
  
    const healthFactor = totalCollateralThreshold / totalBorrowValue;
    // console.log(totalCollateralThreshold, 'asfdsafsdf', totalBorrowValue)
  
    return healthFactor;
  };
  

  const remainingLoanableValue = totalLoanableValue - totalBorrowValue;
  const healthFactor = calculateHealthFactor();

  return (
    <div className="bg-gray-800 bg-opacity-80 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-neonGreen">{t('title')}</h2>
      <table className="w-full text-left">
        <thead className="text-gray-400 border-b border-gray-700">
          <tr>
            <th className="py-2">{t('asset')}</th>
            <th className="py-2">{t('apy')}</th>
            <th className="py-2">{t('borrow_incentive')}</th>
            <th className="py-2">{t('price')}</th>
            <th className="py-2">{t('amount')}</th>
            <th className="py-2">{t('value')}</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => {
            const data = inputAmounts[asset.symbol] || { amount: 0, value: 0 };
            const apy = asset.borrow_rate;
            const incentive = asset.borrow_reward_apy;

            return (
              <tr key={asset.symbol} className={`hover:bg-gray-700 'bg-gray-800'`}>
                <td className="py-3 px-2">{asset.symbol}</td>
                <td className="py-3 px-2">{apy.toFixed(2)}%</td>
                <td className="py-3 px-2">{incentive.toFixed(2)}%</td>
                <td className="py-3 px-2">${asset.price.toFixed(2)}</td>
                <td width={100} className="py-3 px-2">
                  <input
                    type="number"
                    min="0"
                    value={data.amount}
                    onChange={(e) =>
                      handleAmountChange(
                        asset.symbol,
                        "amount",
                        parseFloat(e.target.value)
                      )
                    }
                    className="bg-transparent border-b border-gray-600 focus:outline-none focus:border-neonGreen"
                  />
                </td>
                <td width={100}>
                  <input
                    type="number"
                    min="0"
                    value={data.value}
                    onChange={(e) =>
                      handleAmountChange(
                        asset.symbol,
                        "value",
                        parseFloat(e.target.value)
                      )
                    }
                    className="bg-transparent border-b border-gray-600 focus:outline-none focus:border-neonGreen"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4">
        <p className="py-2 px-2">{t('total_borrow_value')}: ${totalBorrowValue.toFixed(2)}</p>
        <p className="py-2 px-2">{t('remaining_loanable_value')}: ${remainingLoanableValue.toFixed(2)}</p>
        <p className="py-2 px-2">{t('health_factor')}: {healthFactor > 0 ? healthFactor.toFixed(2) : "∞"}</p>
      </div>
    </div>
  );
};

export default BorrowAssetTable;
