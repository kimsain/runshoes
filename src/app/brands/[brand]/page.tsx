import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BrandPageClient from './BrandPageClient';
import { getShoesByBrand } from '@/hooks/useShoes';
import { BrandId } from '@/types';
import brands from '@/data/brands.json';

interface BrandPageProps {
  params: Promise<{ brand: string }>;
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { brand } = await params;
  const brandData = brands.find((b) => b.id === brand);

  if (!brandData) {
    return { title: '브랜드를 찾을 수 없습니다' };
  }

  return {
    title: `${brandData.name} 러닝화 | RunPick`,
    description: brandData.description,
  };
}

export async function generateStaticParams() {
  return brands.map((brand) => ({
    brand: brand.id,
  }));
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { brand } = await params;
  const brandData = brands.find((b) => b.id === brand);

  if (!brandData) {
    notFound();
  }

  const shoes = getShoesByBrand(brand as BrandId);

  return <BrandPageClient brand={brandData} shoes={shoes} />;
}
