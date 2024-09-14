import React from 'react';

interface RiskPreferenceSelectorProps {
  riskPreference: 'low' | 'medium' | 'high';
  setRiskPreference: (preference: 'low' | 'medium' | 'high') => void;
}

const RiskPreferenceSelector: React.FC<RiskPreferenceSelectorProps> = ({ riskPreference, setRiskPreference }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Select Your Risk Preference</label>
      <div className="flex justify-between">
        <button
          type="button"
          className={`p-2 w-1/3 rounded-l bg-${riskPreference === 'low' ? 'blue-500' : 'gray-300'} text-${riskPreference === 'low' ? 'white' : 'black'}`}
          onClick={() => setRiskPreference('low')}
        >
          Low
        </button>
        <button
          type="button"
          className={`p-2 w-1/3 bg-${riskPreference === 'medium' ? 'blue-500' : 'gray-300'} text-${riskPreference === 'medium' ? 'white' : 'black'}`}
          onClick={() => setRiskPreference('medium')}
        >
          Medium
        </button>
        <button
          type="button"
          className={`p-2 w-1/3 rounded-r bg-${riskPreference === 'high' ? 'blue-500' : 'gray-300'} text-${riskPreference === 'high' ? 'white' : 'black'}`}
          onClick={() => setRiskPreference('high')}
        >
          High
        </button>
      </div>
    </div>
  );
};

export default RiskPreferenceSelector;
