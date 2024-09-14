import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getIndexAssetData } from '../api/getIndexAssetData';
import { AssetData, InputAmounts, SupplyData, SupplyAssetTableProps } from '../types';
import ltvData from '../assets/assets_ltv.json';

interface LtvData {
  [symbol: string]: number;
}

const SupplyAssetTable: React.FC<SupplyAssetTableProps> = ({ onSupplyChange }) => {
  const { t } = useTranslation('SupplyAssetTable');
  const [assets, setAssets] = useState<AssetData[]>([]);
  const [inputAmounts, setInputAmounts] = useState<InputAmounts>({});
  const [totalCollateralValue, setTotalCollateralValue] = useState<number>(0);
  const [totalAPYValue, setTotalAPYValue] = useState<number>(0);
  const [totalLoanableValue, setTotalLoanableValue] = useState<number>(0);

  useEffect(() => {
    // 获取资产数据
    const fetchAssets = async () => {
      try {
        const data = await getIndexAssetData();
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
            max_ltv: getMaxLTV(asset.symbol),
          });
        }

        setAssets(assetsArray);
      } catch (error) {
        console.error('Error fetching asset data:', error);
      }
    };

    fetchAssets();
  }, []);

  const getMaxLTV = (symbol: string) => {
    // 根据资产符号，返回对应的 Max LTV，参考协议参数
    return ltvData[symbol] || 0;
  };

  const handleAmountChange = (symbol: string, field: 'amount' | 'value', input: number) => {
    const asset = assets.find(a => a.symbol === symbol);
    if (!asset) return;

    const newInputAmounts = { ...inputAmounts };
    const currentData = newInputAmounts[symbol] || { amount: 0, value: 0 };

    if (field === 'amount') {
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

    // 计算总资产价值和可贷价值
    let collateralValue = 0;
    let loanableValue = 0;
    let apyValue = 0;

    assets.forEach(asset => {
      const data = newInputAmounts[asset.symbol];
      if (data) {
        collateralValue += data.value;
        loanableValue += data.value * asset.max_ltv;
        apyValue += data.value * ((asset.boosted + asset.supply_rate)/100);
        // loanableValue += data.value ;
      }
    });
    setTotalAPYValue(apyValue);
    setTotalCollateralValue(collateralValue);
    setTotalLoanableValue(loanableValue);

    // 将数据传递给父组件
    const supplyData: SupplyData = {
      inputAmounts: newInputAmounts,
      totalCollateralValue: collateralValue,
      totalLoanableValue: loanableValue,
    };
    onSupplyChange(supplyData);
  };

  return (
    <div className="bg-gray-800 bg-opacity-80 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-neonGreen">{t('title')}</h2>
      <table className="w-full text-left">
        <thead className="text-gray-400 border-b border-gray-700">
          <tr>
            <th className="py-2">{t('asset')}</th>
            <th className="py-2">{t('apy')}</th>
            <th className="py-2">{t('max_ltv')}</th>
            <th className="py-2">{t('price')}</th>
            <th className="py-2">{t('amount')}</th>
            <th className="py-2">{t('value')}</th>
            <th className="py-2">{t('loanable_value')}</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => {
            const data = inputAmounts[asset.symbol] || { amount: 0, value: 0 };
            const loanable = data.value * asset.max_ltv;
            const apy = asset.supply_rate + asset.boosted;

            return (
              <tr key={asset.symbol} className={`hover:bg-gray-700 'bg-gray-800'`}>
                <td className="py-3 px-2">{asset.symbol}</td>
                <td className="py-3 px-2">{apy.toFixed(2)}%</td>
                <td className="py-3 px-2">{(asset.max_ltv * 100).toFixed(0)}%</td>
                <td className="py-3 px-2">${asset.price.toFixed(2)}</td>
                <td width={100} className="py-3 px-2">
                  <input
                    type="number"
                    min="0"
                    value={data.amount}
                    onChange={(e) => handleAmountChange(asset.symbol, 'amount', parseFloat(e.target.value))}
                    className="bg-transparent border-b border-gray-600 focus:outline-none focus:border-neonGreen"
                  />
                </td>
                <td width={100}>
                  <input
                    type="number"
                    min="0"
                    value={data.value}
                    onChange={(e) => handleAmountChange(asset.symbol, 'value', parseFloat(e.target.value))}
                    className="bg-transparent border-b border-gray-600 focus:outline-none focus:border-neonGreen"
                  />
                </td>
                <td className="py-2 px-2">${loanable.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4">
        <p className="py-2 px-2">{t('total_collateral_value')}: ${totalCollateralValue.toFixed(2)}</p>
        <p className="py-2 px-2">{t('total_apy_Value')}: ${totalAPYValue.toFixed(2)}</p>
        <p className="py-2 px-2">{t('total_loanable_value')}: ${totalLoanableValue.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default SupplyAssetTable;
