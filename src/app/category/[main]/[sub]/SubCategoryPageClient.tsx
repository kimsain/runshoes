'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shoe, MainCategory } from '@/types';
import ShoeCard from '@/components/shoes/ShoeCard';
import TextSplit from '@/components/animations/TextSplit';
import Badge from '@/components/ui/Badge';

interface CategoryData {
  id: string;
  name: string;
  nameKo: string;
  description: string;
  icon: string;
  color?: string;
}

interface SubCategoryPageClientProps {
  mainCategory: CategoryData & { color: string };
  subCategory: CategoryData;
  shoes: Shoe[];
}

export default function SubCategoryPageClient({
  mainCategory,
  subCategory,
  shoes,
}: SubCategoryPageClientProps) {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const filteredShoes = selectedBrand
    ? shoes.filter((shoe) => shoe.brandId === selectedBrand)
    : shoes;

  const brands = Array.from(new Set(shoes.map((s) => s.brandId)));

  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-white transition-colors">
            홈
          </Link>
          <span>/</span>
          <Link
            href={`/category/${mainCategory.id}`}
            className="hover:text-white transition-colors"
          >
            {mainCategory.nameKo}
          </Link>
          <span>/</span>
          <span className="text-white">{subCategory.nameKo}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${mainCategory.color}40, transparent 70%)`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-center gap-3"
          >
            <span className="text-4xl">{subCategory.icon}</span>
            <Badge variant={mainCategory.id as 'daily' | 'super-trainer' | 'racing'}>
              {mainCategory.nameKo}
            </Badge>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <TextSplit text={subCategory.nameKo} className="text-white" delay={0.1} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-400 max-w-2xl"
          >
            {subCategory.description}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-8 mt-8"
          >
            <div>
              <p className="text-3xl font-bold" style={{ color: mainCategory.color }}>
                {shoes.length}
              </p>
              <p className="text-gray-500">러닝화 모델</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Filters */}
      {brands.length > 1 && (
        <section className="py-6 border-y border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap gap-3">
              <span className="text-gray-500 text-sm py-2.5">브랜드:</span>
              <button
                onClick={() => setSelectedBrand(null)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedBrand === null
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                전체
              </button>
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    selectedBrand === brand
                      ? 'bg-white text-black'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {brand.charAt(0).toUpperCase() + brand.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Shoes Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredShoes.map((shoe, index) => (
              <ShoeCard key={shoe.id} shoe={shoe} index={index} />
            ))}
          </div>

          {filteredShoes.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">해당 조건의 러닝화가 없습니다</p>
              <Link
                href={`/category/${mainCategory.id}`}
                className="inline-flex items-center gap-2 mt-4 text-white hover:text-gray-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {mainCategory.nameKo} 전체보기
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
