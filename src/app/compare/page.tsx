'use client';

import { motion } from 'framer-motion';
import ShoeCompare from '@/components/shoes/ShoeCompare';
import { useCompareStore } from '@/stores/useCompareStore';
import { useShoesById } from '@/hooks/useShoes';

export default function ComparePage() {
  const { compareIds, clearCompare } = useCompareStore();
  const shoes = useShoesById(compareIds);

  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                러닝화 비교
              </h1>
              <p className="text-gray-400">
                최대 3개의 러닝화를 비교해보세요
              </p>
            </div>
            {compareIds.length > 0 && (
              <button
                onClick={clearCompare}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/20 rounded-full hover:bg-white/10 transition-all"
              >
                전체 삭제
              </button>
            )}
          </div>

          {/* Compare slots indicator */}
          <div className="flex gap-3 mt-8">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full transition-all ${
                  index < compareIds.length
                    ? 'bg-gradient-to-r from-orange-500 via-blue-500 to-red-500'
                    : 'bg-white/10'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {compareIds.length}/3 선택됨
          </p>
        </motion.div>

        {/* Compare Content */}
        <ShoeCompare shoes={shoes} />
      </div>
    </div>
  );
}
