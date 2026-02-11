'use client';

import { motion } from 'framer-motion';

interface ProsConsProps {
  pros: string[];
  cons: string[];
}

export default function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {/* Pros */}
      <div className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-2xl md:rounded-3xl p-5 md:p-8 h-full">
        <div className="flex items-center gap-2.5 md:gap-3 mb-4 md:mb-6">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white">장점</h3>
        </div>
        <ul className="space-y-3 md:space-y-4">
          {pros.map((pro, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-2.5 md:gap-3"
            >
              <span className="text-green-400 mt-0.5 md:mt-1 flex-shrink-0">+</span>
              <span className="text-sm md:text-base text-gray-300 leading-relaxed">{pro}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div className="bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 rounded-2xl md:rounded-3xl p-5 md:p-8 h-full">
        <div className="flex items-center gap-2.5 md:gap-3 mb-4 md:mb-6">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white">단점</h3>
        </div>
        <ul className="space-y-3 md:space-y-4">
          {cons.map((con, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-2.5 md:gap-3"
            >
              <span className="text-red-400 mt-0.5 md:mt-1 flex-shrink-0">-</span>
              <span className="text-sm md:text-base text-gray-300 leading-relaxed">{con}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
