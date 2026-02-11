'use client';

import { Shoe } from '@/types';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ShoeSpecs from './ShoeSpecs';
import ProsCons from './ProsCons';
import { formatPrice, getBrandLabel, getSubCategoryLabel, getCategoryLabel } from '@/lib/utils';
import { useCompareStore } from '@/stores/useCompareStore';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface ShoeDetailProps {
  shoe: Shoe;
}

export default function ShoeDetail({ shoe }: ShoeDetailProps) {
  const { addToCompare, isInCompare } = useCompareStore();
  const inCompare = isInCompare(shoe.id);

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`relative aspect-square rounded-3xl overflow-hidden ${
              shoe.brandId === 'nike'
                ? 'bg-gradient-to-br from-orange-500/10 to-transparent'
                : shoe.brandId === 'adidas'
                ? 'bg-gradient-to-br from-blue-600/10 to-transparent'
                : 'bg-gradient-to-br from-red-600/10 to-transparent'
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="relative w-full h-full"
              >
                <Image
                  src={shoe.images[0]?.url || '/images/placeholder-shoe.png'}
                  alt={shoe.name}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant={shoe.brandId}>{getBrandLabel(shoe.brandId)}</Badge>
              <Badge variant={shoe.mainCategory}>{getCategoryLabel(shoe.mainCategory)}</Badge>
              <Badge>{getSubCategoryLabel(shoe.subCategory)}</Badge>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {shoe.nameKo}
            </h1>
            <p className="text-xl text-gray-400 mb-4">{shoe.name}</p>

            {/* Tagline */}
            <p className="text-xl text-gray-300 mb-6">{shoe.tagline}</p>

            {/* Price */}
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">
                {formatPrice(shoe.specs.priceKRW)}
              </span>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">{shoe.specs.weight}g</p>
                <p className="text-sm text-gray-500">무게</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">{shoe.specs.drop}mm</p>
                <p className="text-sm text-gray-500">드롭</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">{shoe.specs.heelStack}mm</p>
                <p className="text-sm text-gray-500">힐 스택</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                variant={inCompare ? 'outline' : 'primary'}
                onClick={() => addToCompare(shoe.id)}
                icon={
                  inCompare ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  )
                }
              >
                {inCompare ? '비교 목록에 추가됨' : '비교하기'}
              </Button>
              <Button variant="secondary" href="/compare">
                비교 페이지로
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <ScrollReveal>
          <div className="bg-white/5 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-white mb-4">상세 설명</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              {shoe.description}
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Pros & Cons */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <ScrollReveal delay={0.1}>
          <ProsCons pros={shoe.proscons.pros} cons={shoe.proscons.cons} />
        </ScrollReveal>
      </section>

      {/* Specs */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <ScrollReveal delay={0.2}>
          <ShoeSpecs shoe={shoe} />
        </ScrollReveal>
      </section>
    </div>
  );
}
