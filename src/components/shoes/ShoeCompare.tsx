'use client';

import { Shoe } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatPrice, getBrandLabel, getSubCategoryLabel } from '@/lib/utils';
import { useCompareStore } from '@/stores/useCompareStore';
import Badge from '@/components/ui/Badge';

interface ShoeCompareProps {
  shoes: Shoe[];
}

const BRAND_COLORS: Record<string, string> = {
  nike: '#FA5400',
  adidas: '#1428A0',
  asics: '#D50032',
};

export default function ShoeCompare({ shoes }: ShoeCompareProps) {
  const { removeFromCompare } = useCompareStore();

  if (shoes.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">비교할 러닝화가 없습니다</h3>
        <p className="text-gray-400 mb-6">러닝화 카드에서 + 버튼을 눌러 비교 목록에 추가하세요</p>
        <Link
          href="/brands/nike"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors"
        >
          러닝화 둘러보기
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    );
  }

  // Prepare chart data
  const chartData = [
    { subject: '쿠셔닝', ...Object.fromEntries(shoes.map((s) => [s.id, s.reviewScore.cushioning])) },
    { subject: '반응성', ...Object.fromEntries(shoes.map((s) => [s.id, s.reviewScore.responsiveness])) },
    { subject: '안정성', ...Object.fromEntries(shoes.map((s) => [s.id, s.reviewScore.stability])) },
    { subject: '내구성', ...Object.fromEntries(shoes.map((s) => [s.id, s.reviewScore.durability])) },
    { subject: '착화감', ...Object.fromEntries(shoes.map((s) => [s.id, s.reviewScore.fit])) },
    { subject: '통기성', ...Object.fromEntries(shoes.map((s) => [s.id, s.reviewScore.breathability])) },
    { subject: '가성비', ...Object.fromEntries(shoes.map((s) => [s.id, s.reviewScore.value])) },
  ];

  const specRows = [
    { label: '가격', getValue: (s: Shoe) => formatPrice(s.specs.priceKRW) },
    { label: '무게', getValue: (s: Shoe) => `${s.specs.weight}g` },
    { label: '힐 스택', getValue: (s: Shoe) => `${s.specs.heelStack}mm` },
    { label: '전족부 스택', getValue: (s: Shoe) => `${s.specs.foreStack}mm` },
    { label: '드롭', getValue: (s: Shoe) => `${s.specs.drop}mm` },
    { label: '출시년도', getValue: (s: Shoe) => `${s.releaseYear}` },
  ];

  return (
    <div className="space-y-12">
      {/* Shoes Overview */}
      <div className={`grid gap-6 ${shoes.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : shoes.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {shoes.map((shoe) => (
          <div
            key={shoe.id}
            className="relative bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            {/* Remove button */}
            <button
              onClick={() => removeFromCompare(shoe.id)}
              className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <Link href={`/shoe/${shoe.slug}`}>
              <div className="relative aspect-[4/3] mb-4">
                <Image
                  src={shoe.images[0]?.url || '/images/placeholder-shoe.png'}
                  alt={shoe.name}
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Info */}
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant={shoe.brandId} size="sm">
                {getBrandLabel(shoe.brandId)}
              </Badge>
              <Badge variant={shoe.mainCategory} size="sm">
                {getSubCategoryLabel(shoe.subCategory)}
              </Badge>
            </div>
            <h3 className="text-lg font-bold text-white">{shoe.nameKo}</h3>
            <p className="text-sm text-gray-400">{shoe.name}</p>
            <p className="text-xl font-bold text-white mt-3">
              {formatPrice(shoe.specs.priceKRW)}
            </p>
          </div>
        ))}
      </div>

      {/* Radar Chart */}
      {shoes.length > 1 && (
        <div className="bg-white/5 rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-6">성능 비교</h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#999', fontSize: 12 }} />
                {shoes.map((shoe) => (
                  <Radar
                    key={shoe.id}
                    name={shoe.nameKo}
                    dataKey={shoe.id}
                    stroke={BRAND_COLORS[shoe.brandId]}
                    fill={BRAND_COLORS[shoe.brandId]}
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                ))}
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Specs Comparison Table */}
      <div className="bg-white/5 rounded-3xl p-8 overflow-x-auto">
        <h3 className="text-xl font-bold text-white mb-6">스펙 비교</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">항목</th>
              {shoes.map((shoe) => (
                <th key={shoe.id} className="text-center py-3 px-4 text-white font-medium">
                  {shoe.nameKo}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specRows.map((row, index) => (
              <tr key={row.label} className={index % 2 === 0 ? 'bg-white/5' : ''}>
                <td className="py-4 px-4 text-gray-400">{row.label}</td>
                {shoes.map((shoe) => (
                  <td key={shoe.id} className="py-4 px-4 text-center text-white font-medium">
                    {row.getValue(shoe)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pros/Cons Comparison */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Pros */}
        <div className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            장점 비교
          </h3>
          <div className={`grid gap-6 ${shoes.length === 1 ? 'grid-cols-1' : shoes.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {shoes.map((shoe) => (
              <div key={shoe.id}>
                <p className="text-sm font-medium text-green-400 mb-3">{shoe.nameKo}</p>
                <ul className="space-y-2">
                  {shoe.proscons.pros.map((pro, idx) => (
                    <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-green-400">+</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Cons */}
        <div className="bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            단점 비교
          </h3>
          <div className={`grid gap-6 ${shoes.length === 1 ? 'grid-cols-1' : shoes.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {shoes.map((shoe) => (
              <div key={shoe.id}>
                <p className="text-sm font-medium text-red-400 mb-3">{shoe.nameKo}</p>
                <ul className="space-y-2">
                  {shoe.proscons.cons.map((con, idx) => (
                    <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-red-400">-</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
