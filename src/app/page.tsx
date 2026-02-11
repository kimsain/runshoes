'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import TextSplit from '@/components/animations/TextSplit';
import ScrollReveal from '@/components/animations/ScrollReveal';
import InfiniteMarquee from '@/components/animations/InfiniteMarquee';
import MagneticButton from '@/components/animations/MagneticButton';
import ShoeCard from '@/components/shoes/ShoeCard';
import { useShoes } from '@/hooks/useShoes';
import categories from '@/data/categories.json';

const brands = [
  {
    id: 'nike',
    name: 'Nike',
    tagline: 'Just Do It',
    color: '#FA5400',
    gradient: 'from-orange-600 to-orange-400',
    description: '페가수스부터 알파플라이까지',
  },
  {
    id: 'adidas',
    name: 'Adidas',
    tagline: 'Impossible is Nothing',
    color: '#1428A0',
    gradient: 'from-blue-700 to-blue-500',
    description: '슈퍼노바부터 프로 에보까지',
  },
  {
    id: 'asics',
    name: 'Asics',
    tagline: 'Sound Mind, Sound Body',
    color: '#D50032',
    gradient: 'from-red-600 to-red-400',
    description: '큐물러스부터 메타스피드까지',
  },
];

export default function HomePage() {
  const allShoes = useShoes();
  const featuredShoes = allShoes.slice(0, 6);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 4,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-3xl"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm text-gray-300">
              Nike · Adidas · Asics
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <TextSplit
              text="나에게 맞는"
              className="text-white block mb-2"
              delay={0.2}
            />
            <TextSplit
              text="러닝화를 찾다"
              className="gradient-text block"
              delay={0.4}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-12"
          >
            데일리 트레이너부터 레이싱화까지,
            <br />
            당신의 러닝 스타일에 맞는 완벽한 러닝화를 추천해드립니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <MagneticButton className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors">
              <Link href="/recommend">러닝화 추천받기</Link>
            </MagneticButton>
            <MagneticButton className="px-8 py-4 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-colors">
              <Link href="/brands/nike">둘러보기</Link>
            </MagneticButton>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-gray-500"
            >
              <span className="text-sm">Scroll</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Brand Cards Section */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
              브랜드 선택
            </h2>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
              세계 최고의 러닝화 브랜드에서 당신에게 맞는 러닝화를 찾아보세요
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brands.map((brand, index) => (
              <ScrollReveal key={brand.id} delay={index * 0.15}>
                <Link href={`/brands/${brand.id}`}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer"
                  >
                    {/* Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${brand.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

                    {/* Glow effect */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0"
                      style={{
                        boxShadow: `inset 0 0 100px ${brand.color}40`,
                      }}
                    />

                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <p className="text-sm text-gray-400 mb-2">{brand.tagline}</p>
                      <h3 className="text-3xl font-bold text-white mb-2">{brand.name}</h3>
                      <p className="text-gray-300">{brand.description}</p>

                      {/* Arrow */}
                      <motion.div
                        initial={{ x: 0, opacity: 0.5 }}
                        whileHover={{ x: 10, opacity: 1 }}
                        className="mt-4"
                      >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
              카테고리별 탐색
            </h2>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
              러닝 목적에 맞는 카테고리를 선택하세요
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.main.map((category, index) => (
              <ScrollReveal key={category.id} delay={index * 0.15}>
                <Link href={`/category/${category.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all group"
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {category.nameKo}
                    </h3>
                    <p className="text-gray-400 mb-4">{category.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {category.subCategories.slice(0, 3).map((sub) => (
                        <span
                          key={sub.id}
                          className="text-xs px-3 py-1 bg-white/5 rounded-full text-gray-400"
                        >
                          {sub.nameKo}
                        </span>
                      ))}
                      {category.subCategories.length > 3 && (
                        <span className="text-xs px-3 py-1 bg-white/5 rounded-full text-gray-400">
                          +{category.subCategories.length - 3}
                        </span>
                      )}
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Shoes */}
      <section className="py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  인기 러닝화
                </h2>
                <p className="text-gray-400">가장 많은 관심을 받는 러닝화를 만나보세요</p>
              </div>
              <Link
                href="/brands/nike"
                className="hidden md:flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
              >
                전체보기
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredShoes.map((shoe, index) => (
              <ShoeCard key={shoe.id} shoe={shoe} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Infinite Marquee */}
      <section className="py-16 bg-black border-y border-white/10">
        <InfiniteMarquee speed={40}>
          <div className="flex items-center gap-16 px-8">
            {['Nike', 'Adidas', 'Asics', 'Running', 'Marathon', 'Racing', 'Daily', 'Speed'].map(
              (text, i) => (
                <span
                  key={i}
                  className="text-4xl md:text-6xl font-bold text-white/10 whitespace-nowrap"
                >
                  {text}
                </span>
              )
            )}
          </div>
        </InfiniteMarquee>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              어떤 러닝화를 신어야 할지 모르겠다면?
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              5가지 질문에 답하고 나에게 맞는 러닝화를 추천받으세요
            </p>
            <MagneticButton className="px-10 py-5 bg-gradient-to-r from-orange-500 via-blue-500 to-red-500 text-white font-semibold text-lg rounded-full hover:opacity-90 transition-opacity">
              <Link href="/recommend">무료 러닝화 추천받기</Link>
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
