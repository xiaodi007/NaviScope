import React, { useState } from 'react';
import RiskPreferenceSelector from '../components/RiskPreferenceSelector';
import InvestmentSuggestion from '../components/InvestmentSuggestion';

const SmartInvestPage: React.FC = () => {
  const [address, setAddress] = useState('');
  const [totalValue, setTotalValue] = useState<number | null>(null);
  const [riskPreference, setRiskPreference] = useState<'low' | 'medium' | 'high'>('medium');
  const [investmentSuggestion, setInvestmentSuggestion] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 基于用户输入的地址或资产总值，结合风险偏好，生成投资建议
    if (address || totalValue) {
      const suggestion = generateInvestmentStrategy(totalValue, riskPreference);
      setInvestmentSuggestion(suggestion);
    }
  };

  // 简单的策略生成逻辑
  const generateInvestmentStrategy = (value: number | null, risk: 'low' | 'medium' | 'high') => {
    if (risk === 'low') {
      return `建议采用保守策略，健康因子保持在1.5以上，分配资产为 ${value ? value * 0.6 : '60%'} USDC， ${value ? value * 0.4 : '40%'} SUI。`;
    } else if (risk === 'medium') {
      return `建议采用平衡策略，健康因子保持在1.2以上，分配资产为 ${value ? value * 0.4 : '40%'} USDC， ${value ? value * 0.6 : '60%'} SUI。`;
    } else {
      return `建议采用进取策略，健康因子可低于1.1，分配资产为 ${value ? value * 0.3 : '30%'} USDC， ${value ? value * 0.7 : '70%'} SUI。`;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Smart Investment Advisor</h1>
      <h2 className="text-2xl font-bold mb-8 text-center"> (Coming Soon)</h2>
      {/* 功能介绍说明 */}
      <div className="bg-blue-100 p-4 rounded-md mb-8">
        <p className="text-lg text-gray-800">
          用户可以选择输入已有地址，系统会自动拉取当前投资组合，或者输入资产总值，结合风险偏好生成投资策略。
          <br />
          Users can choose to enter an existing address, and the system will automatically retrieve the current investment portfolio. Alternatively, they can input a total asset value and generate an investment strategy based on their risk preference.
          <br />
          <strong>风险偏好：</strong> 选择低、中、高风险，系统会根据你的风险偏好生成不同的投资组合策略。低风险对应保守策略，健康因子更高，高风险对应进取策略，健康因子较低。
          <br />
          <strong>Risk Preference:</strong> Choose from low, medium, or high risk. The system will generate different investment portfolio strategies based on your selected risk level. Low risk corresponds to a conservative strategy with a higher health factor, while high risk offers a more aggressive strategy with a lower health factor.
          <br />
          <strong>投资建议：</strong> 页面将根据输入生成个性化的资产组合建议，并帮助你优化资产配置。
          <br />
          <strong>Investment Suggestions:</strong> The page will generate personalized asset allocation recommendations based on your input, helping you optimize your portfolio.
        </p>
      </div>
            {/* Feature Introduction */}

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 mb-2">Enter Your Address (Optional)</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="totalValue" className="block text-gray-700 mb-2">Enter Total Asset Value (Optional)</label>
          <input
            type="number"
            id="totalValue"
            value={totalValue || ''}
            onChange={(e) => setTotalValue(Number(e.target.value))}
            placeholder="Enter total asset value"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <RiskPreferenceSelector riskPreference={riskPreference} setRiskPreference={setRiskPreference} />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Get Investment Suggestion</button>
      </form>
      {investmentSuggestion && <InvestmentSuggestion suggestion={investmentSuggestion} />}

    </div>
    
  );
};

export default SmartInvestPage;
