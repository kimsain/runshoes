'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { RecommendationResult } from '@/lib/recommendation';
import Badge from '@/components/ui/Badge';
import { formatPrice, getBrandLabel, getSubCategoryLabel } from '@/lib/utils';

interface ResultCardProps {
  result: RecommendationResult;
  rank: number;
  isTopPick?: boolean;
}

export default function ResultCard({ result, rank, isTopPick = false }: ResultCardProps) {
  const { shoe, matchScore, matchReasons } = result;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1 }}
    >
      <Link href={`/shoe/${shoe.slug}`}>
        <div
          className={`group relative overflow-hidden rounded-2xl transition-all ${
            isTopPick
              ? 'bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 hover:border-white/40'
              : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
          }`}
        >
          {/* Top Pick Badge */}
          {isTopPick && (
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1.5 bg-gradient-to-r from-orange-500 via-blue-500 to-red-500 text-white text-sm font-semibold rounded-full">
                Best Match
              </span>
            </div>
          )}

          {/* Rank Badge */}
          {!isTopPick && (
            <div className="absolute top-4 left-4 z-10">
              <span className="w-8 h-8 flex items-center justify-center bg-white/10 text-white text-sm font-bold rounded-full">
                {rank}
              </span>
            </div>
          )}

          <div className={`flex ${isTopPick ? 'flex-col md:flex-row' : 'flex-row'}`}>
            {/* Image */}
            <div
              className={`relative ${
                isTopPick
                  ? 'aspect-square md:aspect-auto md:w-1/2 bg-gradient-to-br from-white/5 to-transparent'
                  : 'w-32 h-32 flex-shrink-0'
              }`}
            >
              <div className={`absolute inset-0 flex items-center justify-center ${isTopPick ? 'p-12' : 'p-4'}`}>
                <Image
                  src={shoe.images[0]?.url || '/images/placeholder-shoe.png'}
                  alt={shoe.name}
                  fill
                  className="object-contain transition-transform group-hover:scale-105"
                />
              </div>
            </div>

            {/* Content */}
            <div className={`flex-1 ${isTopPick ? 'p-8' : 'p-4'}`}>
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant={shoe.brandId} size="sm">
                  {getBrandLabel(shoe.brandId)}
                </Badge>
                <Badge variant={shoe.mainCategory} size="sm">
                  {getSubCategoryLabel(shoe.subCategory)}
                </Badge>
              </div>

              {/* Title */}
              <h3 className={`font-bold text-white mb-1 ${isTopPick ? 'text-2xl' : 'text-lg'}`}>
                {shoe.nameKo}
              </h3>
              <p className="text-gray-400 text-sm mb-2">{shoe.name}</p>

              {/* Tagline */}
              {isTopPick && (
                <p className="text-gray-300 mb-4">{shoe.tagline}</p>
              )}

              {/* Match Reasons */}
              <div className="flex flex-wrap gap-2 mb-4">
                {matchReasons.slice(0, isTopPick ? 4 : 2).map((reason, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    {reason}
                  </span>
                ))}
              </div>

              {/* Price & Specs */}
              <div className="flex items-end justify-between">
                <div className="flex gap-4 text-xs text-gray-500">
                  <span>{shoe.specs.weight}g</span>
                  <span>{shoe.specs.drop}mm 드롭</span>
                </div>
                <span className={`font-bold text-white ${isTopPick ? 'text-2xl' : 'text-lg'}`}>
                  {formatPrice(shoe.specs.priceKRW)}
                </span>
              </div>

              {/* CTA for Top Pick */}
              {isTopPick && (
                <div className="mt-6 flex gap-4">
                  <span className="flex-1 py-3 bg-white text-black font-semibold text-center rounded-full group-hover:bg-gray-100 transition-colors">
                    자세히 보기
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
