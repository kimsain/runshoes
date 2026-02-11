'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const footerLinks = {
  brands: [
    { href: '/brands/nike', label: 'Nike' },
    { href: '/brands/adidas', label: 'Adidas' },
    { href: '/brands/asics', label: 'Asics' },
  ],
  categories: [
    { href: '/category/daily', label: '데일리 트레이너' },
    { href: '/category/super-trainer', label: '슈퍼트레이너' },
    { href: '/category/racing', label: '레이싱' },
  ],
  features: [
    { href: '/recommend', label: '러닝화 추천' },
    { href: '/compare', label: '러닝화 비교' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold">
                Run<span className="gradient-text">Pick</span>
              </span>
            </Link>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              나에게 맞는 러닝화를 찾아보세요.
              <br />
              Nike, Adidas, Asics의 모든 러닝화를
              <br />
              한눈에 비교할 수 있습니다.
            </p>
          </div>

          {/* Brands */}
          <div>
            <h3 className="text-white font-semibold mb-4">브랜드</h3>
            <ul className="space-y-3">
              {footerLinks.brands.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">카테고리</h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-white font-semibold mb-4">기능</h3>
            <ul className="space-y-3">
              {footerLinks.features.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 RunPick. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <motion.a
              href="#"
              whileHover={{ scale: 1.1 }}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
