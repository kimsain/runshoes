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
          className={`group relative overflow-hidden rounded-xl md:rounded-2xl transition-all ${
            isTopPick
              ? 'bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 hover:border-white/40'
              : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 active:bg-white/15'
          }`}
        >
          {/* Top Pick Badge */}
          {isTopPick && (
            <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10">
              <span className="px-2.5 py-1 md:px-3 md:py-1.5 bg-gradient-to-r from-orange-500 via-blue-500 to-red-500 text-white text-xs md:text-sm font-semibold rounded-full">
                Best Match
              </span>
            </div>
          )}

          {/* Rank Badge */}
          {!isTopPick && (
            <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10">
              <span className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-white/10 text-white text-xs md:text-sm font-bold rounded-full">
                {rank}
              </span>
            </div>
          )}

          <div className={`flex ${isTopPick ? 'flex-col sm:flex-row' : 'flex-row'}`}>
            {/* Image */}
            <div
              className={`relative flex-shrink-0 ${
                isTopPick
                  ? 'aspect-square sm:aspect-auto sm:w-2/5 md:w-1/2 bg-gradient-to-br from-white/5 to-transparent'
                  : 'w-24 h-24 md:w-32 md:h-32'
              }`}
            >
              <div className={`absolute inset-0 flex items-center justify-center ${isTopPick ? 'p-8 md:p-12' : 'p-3 md:p-4'}`}>
                <Image
                  src={shoe.images[0]?.url || '/images/placeholder-shoe.png'}
                  alt={shoe.name}
                  fill
                  className="object-contain transition-transform group-hover:scale-105"
                />
              </div>
            </div>

            {/* Content */}
            <div className={`flex-1 min-w-0 flex flex-col ${isTopPick ? 'p-5 md:p-8' : 'p-3 md:p-4'}`}>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                <Badge variant={shoe.brandId} size="sm">
                  {getBrandLabel(shoe.brandId)}
                </Badge>
                <Badge variant={shoe.mainCategory} size="sm">
                  {getSubCategoryLabel(shoe.subCategory)}
                </Badge>
              </div>

              {/* Title */}
              <h3 className={`font-bold text-white mb-0.5 md:mb-1 line-clamp-1 ${isTopPick ? 'text-xl md:text-2xl' : 'text-base md:text-lg'}`}>
                {shoe.nameKo}
              </h3>
              <p className="text-gray-400 text-xs md:text-sm mb-1.5 md:mb-2 truncate">{shoe.name}</p>

              {/* Tagline */}
              {isTopPick && (
                <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4 line-clamp-2">{shoe.tagline}</p>
              )}

              {/* Match Reasons */}
              <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                {matchReasons.slice(0, isTopPick ? 4 : 2).map((reason, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-1.5 md:px-2 py-0.5 md:py-1 bg-green-500/10 text-green-400 text-[10px] md:text-xs rounded-full"
                  >
                    <svg className="w-2.5 h-2.5 md:w-3 md:h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span className="truncate">{reason}</span>
                  </span>
                ))}
              </div>

              {/* Price & Specs */}
              <div className="mt-auto flex items-end justify-between gap-2">
                <div className="flex gap-2 md:gap-4 text-[10px] md:text-xs text-gray-500">
                  <span>{shoe.specs.weight}g</span>
                  <span>{shoe.specs.drop}mm 드롭</span>
                </div>
                <span className={`font-bold text-white whitespace-nowrap ${isTopPick ? 'text-xl md:text-2xl' : 'text-base md:text-lg'}`}>
                  {formatPrice(shoe.specs.priceKRW)}
                </span>
              </div>

              {/* CTA for Top Pick */}
              {isTopPick && (
                <div className="mt-4 md:mt-6">
                  <span className="block w-full py-2.5 md:py-3 bg-white text-black text-sm md:text-base font-semibold text-center rounded-full group-hover:bg-gray-100 transition-colors">
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
