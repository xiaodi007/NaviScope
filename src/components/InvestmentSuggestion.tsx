import React from 'react';

interface InvestmentSuggestionProps {
  suggestion: string;
}

const InvestmentSuggestion: React.FC<InvestmentSuggestionProps> = ({ suggestion }) => {
  return (
    <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded">
      <h2 className="text-2xl font-bold mb-4">Investment Suggestion</h2>
      <p>{suggestion}</p>
    </div>
  );
};

export default InvestmentSuggestion;
