'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shoe } from '@/types';
import ShoeCard from '@/components/shoes/ShoeCard';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextSplit from '@/components/animations/TextSplit';
import Badge from '@/components/ui/Badge';

interface SubCategoryData {
  id: string;
  name: string;
  nameKo: string;
  description: string;
  icon: string;
}

interface CategoryData {
  id: string;
  name: string;
  nameKo: string;
  description: string;
  icon: string;
  color: string;
  subCategories: SubCategoryData[];
}

interface CategoryPageClientProps {
  category: CategoryData;
  shoes: Shoe[];
}

export default function CategoryPageClient({ category, shoes }: CategoryPageClientProps) {
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const filteredShoes = shoes.filter((shoe) => {
    if (selectedSub && shoe.subCategory !== selectedSub) return false;
    if (selectedBrand && shoe.brandId !== selectedBrand) return false;
    return true;
  });

  const brands = Array.from(new Set(shoes.map((s) => s.brandId)));

  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${category.color}40, transparent 70%)`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-center gap-3"
          >
            <span className="text-4xl">{category.icon}</span>
            <Badge variant={category.id as 'daily' | 'super-trainer' | 'racing'}>
              {category.name}
            </Badge>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <TextSplit text={category.nameKo} className="text-white" delay={0.1} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-400 max-w-2xl"
          >
            {category.description}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-8 mt-10"
          >
            <div>
              <p className="text-4xl font-bold" style={{ color: category.color }}>
                {shoes.length}
              </p>
              <p className="text-gray-500">러닝화 모델</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white">{brands.length}</p>
              <p className="text-gray-500">브랜드</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sub Categories */}
      <section className="py-8 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-4">
            {/* Sub Category Filters */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedSub(null)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedSub === null
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                전체
              </button>
              {category.subCategories.map((sub) => {
                const count = shoes.filter((s) => s.subCategory === sub.id).length;
                if (count === 0) return null;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSub(sub.id)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                      selectedSub === sub.id
                        ? 'bg-white text-black'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <span>{sub.icon}</span>
                    {sub.nameKo} ({count})
                  </button>
                );
              })}
            </div>

            {/* Brand Filters */}
            <div className="flex flex-wrap gap-3">
              <span className="text-gray-500 text-sm py-2.5">브랜드:</span>
              <button
                onClick={() => setSelectedBrand(null)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedBrand === null
                    ? 'bg-white/20 text-white'
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
                      ? 'bg-white/20 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {brand.charAt(0).toUpperCase() + brand.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shoes Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {selectedSub
                    ? category.subCategories.find((s) => s.id === selectedSub)?.nameKo
                    : '전체 러닝화'}
                </h2>
                <p className="text-gray-500 mt-1">{filteredShoes.length}개의 모델</p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredShoes.map((shoe, index) => (
              <ShoeCard key={shoe.id} shoe={shoe} index={index} />
            ))}
          </div>

          {filteredShoes.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">해당 조건의 러닝화가 없습니다</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
