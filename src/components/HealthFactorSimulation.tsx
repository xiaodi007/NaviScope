import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AssetData, InputAmounts } from '../types';
import assetChangesData from '../assets/asset_changes.json';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface SimulationProps {
  totalCollateralValue: number;
  totalBorrowValue: number;
  supplyAssets: InputAmounts;
  borrowAssets: InputAmounts;
  assets: AssetData[];
}

const HealthFactorSimulation: React.FC<SimulationProps> = ({
  totalCollateralValue,
  totalBorrowValue,
  supplyAssets,
  borrowAssets,
  assets,
}) => {
  const { t } = useTranslation('HealthFactorSimulation');
  const [simulationResults, setSimulationResults] = useState<any>(null);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('1d');
  const [isLoading, setIsLoading] = useState(false);

  const runSimulation = () => {
    const iterations = 100000;
    const timeFrames = ['1d', '3d', '7d'];
    const simulations = {};

    setIsLoading(true);

    setTimeout(() => {
      timeFrames.forEach((timeFrame) => {
        const priceChangesArray = generatePriceChangesArray(iterations, timeFrame);

        const healthFactors: number[] = [];

        for (let i = 0; i < iterations; i++) {
          const priceChanges = priceChangesArray[i];

          let totalCollateralThreshold = 0;
          let totalBorrowValueSim = 0;

          assets.forEach((asset) => {
            const priceChange = priceChanges[asset.symbol];
            const newPrice = asset.price * (1 + priceChange);

            // 计算供应资产的价值
            const supplyAmount = supplyAssets[asset.symbol]?.amount || 0;
            const supplyValue = supplyAmount * newPrice;
            totalCollateralThreshold += supplyValue * asset.liquidation_threshold;

            // 计算借款资产的价值
            const borrowAmount = borrowAssets[asset.symbol]?.amount || 0;
            const borrowValue = borrowAmount * newPrice;
            totalBorrowValueSim += borrowValue;
          });

          // 计算健康因子
          const healthFactor =
            totalBorrowValueSim > 0 ? totalCollateralThreshold / totalBorrowValueSim : Infinity;
          healthFactors.push(healthFactor);
        }

        // 计算健康因子的频率分布
        const frequencyDistribution = calculateFrequencyDistribution(healthFactors);

        simulations[timeFrame] = {
          healthFactors,
          frequencyDistribution,
        };
      });

      setSimulationResults(simulations);
      setIsLoading(false);
    }, 100);
  };

  const generatePriceChangesArray = (iterations: number, timeFrame: string) => {
    const priceChangesArray: { [symbol: string]: number }[] = [];

    for (let i = 0; i < iterations; i++) {
      const priceChanges: { [symbol: string]: number } = {};

      assets.forEach((asset) => {
        const changes = assetChangesData[asset.symbol]?.[timeFrame];
        if (!changes) {
          priceChanges[asset.symbol] = 0;
        } else {
          priceChanges[asset.symbol] = getRandomPriceChangeFromDistribution(changes);
        }
      });

      priceChangesArray.push(priceChanges);
    }

    return priceChangesArray;
  };

  const getRandomPriceChangeFromDistribution = (changes: { [key: string]: number }) => {
    const cumulativeProbabilities = [];
    const priceChanges = [];
    let cumulative = 0;

    for (const [changeStr, probability] of Object.entries(changes)) {
      cumulative += probability as number;
      cumulativeProbabilities.push(cumulative);
      priceChanges.push(parseFloat(changeStr));
    }

    const randomValue = Math.random();
    for (let i = 0; i < cumulativeProbabilities.length; i++) {
      if (randomValue <= cumulativeProbabilities[i]) {
        return priceChanges[i];
      }
    }

    return 0;
  };

  const calculateFrequencyDistribution = (healthFactors: number[]) => {
    // 将健康因子划分为区间，创建直方图数据
    const binSize = 0.1; // 健康因子区间的大小
    const maxHF = Math.min(Math.max(...healthFactors), 5); // 设置健康因子的最大值（例如5）
    const bins = [];

    for (let i = 0; i <= maxHF; i += binSize) {
      bins.push({
        binStart: i,
        binEnd: i + binSize,
        count: 0,
      });
    }

    // 统计每个区间的健康因子数量
    healthFactors.forEach((hf) => {
      if (hf > maxHF) return;
      const index = Math.floor(hf / binSize);
      if (bins[index]) {
        bins[index].count += 1;
      }
    });

    // 将计数转换为概率
    const total = healthFactors.length;
    bins.forEach((bin) => {
      bin.probability = (bin.count / total) * 100;
    });

    return bins;
  };

  const calculateProbabilityBelowOne = (healthFactors: number[]) => {
    const count = healthFactors.filter((hf) => hf < 1).length;
    return (count / healthFactors.length) * 100;
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-neonGreen">{t('title')}</h2>
      <button
        onClick={runSimulation}
        className="px-4 py-2 bg-neonGreen text-black rounded hover:opacity-90 transition duration-300"
      >
        {t('calculate_simulation')}
      </button>

      {isLoading && <div className="mt-4">{t('loading_simulation')}</div>}

      {simulationResults && (
        <div className="mt-6">
          {/* 时间范围选择 */}
          <div className="flex space-x-2">
            {['1d', '3d', '7d'].map((timeFrame) => (
              <button
                key={timeFrame}
                onClick={() => setSelectedTimeFrame(timeFrame)}
                className={`px-4 py-2 rounded ${
                  selectedTimeFrame === timeFrame ? 'bg-neonGreen text-black' : 'bg-gray-700 text-white'
                }`}
              >
                {timeFrame.replace('d', '')} {t('day', { ns: 'HealthFactorSimulation' })}
              </button>
            ))}
          </div>

          {/* 显示选定时间范围的图表 */}
          {(() => {
            const timeFrame = selectedTimeFrame;
            const data = simulationResults[timeFrame];
            if (!data) return null;

            const chartData = {
              labels: data.frequencyDistribution.map(
                (d) => `${d.binStart.toFixed(1)} - ${d.binEnd.toFixed(1)}`
              ),
              datasets: [
                {
                  label: t('health_factor_distribution', { day: timeFrame.replace('d', '') }),
                  data: data.frequencyDistribution.map((d) => d.probability ),
                  backgroundColor: 'rgba(0, 255, 255, 0.5)',
                },
              ],
            };

            const options = {
              responsive: true,
              maintainAspectRatio: false, 
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: true,
                  text: t('health_factor_distribution', { day: timeFrame.replace('d', '') }),
                  font: {
                    size: 18,
                  },
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: t('health_factor'),
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: t('probability'),
                  },
                },
              },
            };

            return (
              <div key={timeFrame} className="mt-8" style={{ height: '500px' }}>
                <h3 className="text-xl font-semibold">
                  {/* {t('day', { day: timeFrame.replace('d', '') })}{' '} */}
                  {t('probability_below_1')}：{calculateProbabilityBelowOne(data.healthFactors).toFixed(2)}%
                </h3>
                <Bar data={chartData} options={options} />
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default HealthFactorSimulation;
