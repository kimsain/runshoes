'use client';

import { Shoe } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import { formatPrice, getBrandLabel, getSubCategoryLabel } from '@/lib/utils';
import { useCompareStore } from '@/stores/useCompareStore';

interface ShoeCardProps {
  shoe: Shoe;
  index?: number;
}

export default function ShoeCard({ shoe, index = 0 }: ShoeCardProps) {
  const { addToCompare, removeFromCompare, isInCompare } = useCompareStore();
  const inCompare = isInCompare(shoe.id);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(shoe.id);
    } else {
      addToCompare(shoe.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link href={`/shoe/${shoe.slug}`}>
        <motion.div
          whileHover={{ y: -8 }}
          className={`group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20 ${
            shoe.brandId === 'nike'
              ? 'hover:shadow-[0_0_40px_rgba(250,84,0,0.15)]'
              : shoe.brandId === 'adidas'
              ? 'hover:shadow-[0_0_40px_rgba(20,40,160,0.15)]'
              : 'hover:shadow-[0_0_40px_rgba(213,0,50,0.15)]'
          }`}
        >
          {/* Compare Button */}
          <button
            onClick={handleCompareClick}
            className={`absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              inCompare
                ? 'bg-white text-black'
                : 'bg-black/50 text-white opacity-0 group-hover:opacity-100'
            }`}
          >
            {inCompare ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            )}
          </button>

          {/* Image */}
          <div className="relative aspect-[4/3] bg-gradient-to-br from-white/5 to-transparent">
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="relative w-full h-full">
                <Image
                  src={shoe.images[0]?.url || '/images/placeholder-shoe.png'}
                  alt={shoe.name}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
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
            <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-gray-100">
              {shoe.nameKo}
            </h3>
            <p className="text-sm text-gray-400 mb-3">{shoe.name}</p>

            {/* Tagline */}
            <p className="text-sm text-gray-500 line-clamp-2 mb-4">
              {shoe.tagline}
            </p>

            {/* Specs & Price */}
            <div className="flex items-end justify-between">
              <div className="flex gap-4 text-xs text-gray-500">
                <span>{shoe.specs.weight}g</span>
                <span>{shoe.specs.drop}mm 드롭</span>
              </div>
              <span className="text-lg font-bold text-white">
                {formatPrice(shoe.specs.priceKRW)}
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
