'use client';

import { motion } from 'framer-motion';
import { Shoe } from '@/types';
import ShoeCard from '@/components/shoes/ShoeCard';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextSplit from '@/components/animations/TextSplit';
import categories from '@/data/categories.json';
import { useState } from 'react';

interface BrandData {
  id: string;
  name: string;
  nameKo: string;
  description: string;
  tagline: string;
  color: string;
  secondaryColor: string;
  logo: string;
  heroImage: string;
}

interface BrandPageClientProps {
  brand: BrandData;
  shoes: Shoe[];
}

export default function BrandPageClient({ brand, shoes }: BrandPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredShoes = selectedCategory
    ? shoes.filter((shoe) => shoe.mainCategory === selectedCategory)
    : shoes;

  return (
    <div className="min-h-screen bg-black pt-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Glow */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${brand.color}40, transparent 70%)`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <span
              className="inline-block px-4 py-2 rounded-full text-sm font-medium"
              style={{ backgroundColor: `${brand.color}20`, color: brand.color }}
            >
              {brand.tagline}
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <TextSplit text={brand.name} className="text-white" delay={0.1} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-400 max-w-2xl"
          >
            {brand.description}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-8 mt-10"
          >
            <div>
              <p className="text-4xl font-bold" style={{ color: brand.color }}>
                {shoes.length}
              </p>
              <p className="text-gray-500">러닝화 모델</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white">
                {new Set(shoes.map((s) => s.mainCategory)).size}
              </p>
              <p className="text-gray-500">카테고리</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              전체 ({shoes.length})
            </button>
            {categories.main.map((category) => {
              const count = shoes.filter((s) => s.mainCategory === category.id).length;
              if (count === 0) return null;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-white text-black'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {category.nameKo} ({count})
                </button>
              );
            })}
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
                  {selectedCategory
                    ? categories.main.find((c) => c.id === selectedCategory)?.nameKo
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
              <p className="text-gray-500 text-lg">해당 카테고리의 러닝화가 없습니다</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
