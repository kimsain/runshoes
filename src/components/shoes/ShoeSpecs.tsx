'use client';

import { Shoe } from '@/types';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';

interface ShoeSpecsProps {
  shoe: Shoe;
}

export default function ShoeSpecs({ shoe }: ShoeSpecsProps) {
  const chartData = [
    { subject: '쿠셔닝', value: shoe.reviewScore.cushioning },
    { subject: '반응성', value: shoe.reviewScore.responsiveness },
    { subject: '안정성', value: shoe.reviewScore.stability },
    { subject: '내구성', value: shoe.reviewScore.durability },
    { subject: '착화감', value: shoe.reviewScore.fit },
    { subject: '통기성', value: shoe.reviewScore.breathability },
    { subject: '가성비', value: shoe.reviewScore.value },
  ];

  const specs = [
    { label: '무게', value: `${shoe.specs.weight}g`, detail: shoe.specs.weightSize },
    { label: '힐 스택', value: `${shoe.specs.heelStack}mm`, detail: '뒤꿈치 높이' },
    { label: '전족부 스택', value: `${shoe.specs.foreStack}mm`, detail: '앞꿈치 높이' },
    { label: '드롭', value: `${shoe.specs.drop}mm`, detail: '힐-토 차이' },
    { label: '출시년도', value: `${shoe.releaseYear}`, detail: '' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      {/* Radar Chart */}
      <div className="bg-white/5 rounded-3xl p-6 md:p-8">
        <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">성능 지표</h3>
        <div className="h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="#333" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: '#999', fontSize: 12 }}
              />
              <Radar
                name={shoe.name}
                dataKey="value"
                stroke={
                  shoe.brandId === 'nike'
                    ? '#FA5400'
                    : shoe.brandId === 'adidas'
                    ? '#1428A0'
                    : '#D50032'
                }
                fill={
                  shoe.brandId === 'nike'
                    ? '#FA5400'
                    : shoe.brandId === 'adidas'
                    ? '#1428A0'
                    : '#D50032'
                }
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Score Legend */}
        <div className="grid grid-cols-2 gap-2 md:gap-3 mt-4 md:mt-6">
          {chartData.map((item) => (
            <div
              key={item.subject}
              className="flex items-center justify-between bg-white/5 rounded-lg px-2.5 md:px-3 py-1.5 md:py-2"
            >
              <span className="text-xs md:text-sm text-gray-400 truncate mr-2">{item.subject}</span>
              <span className="text-xs md:text-sm font-semibold text-white whitespace-nowrap">{item.value}/10</span>
            </div>
          ))}
        </div>
      </div>

      {/* Specs Table */}
      <div className="bg-white/5 rounded-3xl p-6 md:p-8">
        <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">상세 스펙</h3>
        <div className="space-y-3 md:space-y-4">
          {specs.map((spec, index) => (
            <div
              key={spec.label}
              className="flex items-center justify-between py-3 md:py-4 border-b border-white/10 last:border-0 gap-4"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm md:text-base text-white font-medium">{spec.label}</p>
                {spec.detail && (
                  <p className="text-xs md:text-sm text-gray-500 truncate">{spec.detail}</p>
                )}
              </div>
              <p className="text-lg md:text-xl font-bold text-white whitespace-nowrap">{spec.value}</p>
            </div>
          ))}
        </div>

        {/* Score Bars */}
        <div className="mt-6 md:mt-8">
          <h4 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">점수 분석</h4>
          <div className="space-y-3">
            {chartData.slice(0, 4).map((item) => (
              <div key={item.subject}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">{item.subject}</span>
                  <span className="text-white">{item.value}/10</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      shoe.brandId === 'nike'
                        ? 'bg-orange-500'
                        : shoe.brandId === 'adidas'
                        ? 'bg-blue-600'
                        : 'bg-red-600'
                    }`}
                    style={{ width: `${item.value * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
