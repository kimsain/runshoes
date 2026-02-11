import { Shoe, MainCategory, SubCategory, BrandId } from '@/types';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ko-KR').format(price) + '원';
}

export function formatWeight(weight: number): string {
  return `${weight}g`;
}

export function getCategoryLabel(category: MainCategory): string {
  const labels: Record<MainCategory, string> = {
    daily: '데일리 트레이너',
    'super-trainer': '슈퍼트레이너',
    racing: '레이싱',
  };
  return labels[category];
}

export function getSubCategoryLabel(subCategory: SubCategory): string {
  const labels: Record<SubCategory, string> = {
    beginner: '입문화',
    'max-cushion': '맥스쿠션화',
    stability: '안정화',
    'all-rounder': '올라운더',
    'lightweight-trainer': '경량트레이너',
    'non-plate': '논플레이트',
    'light-plate': '라이트플레이트',
    'carbon-plate': '카본플레이트',
    'half-marathon': '하프마라톤',
    'full-marathon': '풀마라톤',
  };
  return labels[subCategory];
}

export function getBrandLabel(brandId: BrandId): string {
  const labels: Record<BrandId, string> = {
    nike: 'Nike',
    adidas: 'Adidas',
    asics: 'Asics',
  };
  return labels[brandId];
}

export function getBrandColor(brandId: BrandId): string {
  const colors: Record<BrandId, string> = {
    nike: '#FA5400',
    adidas: '#1428A0',
    asics: '#D50032',
  };
  return colors[brandId];
}

export function getCategoryColor(category: MainCategory): string {
  const colors: Record<MainCategory, string> = {
    daily: '#3B82F6',
    'super-trainer': '#8B5CF6',
    racing: '#EF4444',
  };
  return colors[category];
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export function getAverageScore(reviewScore: Shoe['reviewScore']): number {
  const values = Object.values(reviewScore);
  return Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10;
}

export function getScoreLabel(score: number): string {
  if (score >= 9) return '최고';
  if (score >= 8) return '우수';
  if (score >= 7) return '좋음';
  if (score >= 6) return '보통';
  return '미흡';
}
