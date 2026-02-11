import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryPageClient from './CategoryPageClient';
import { getShoesByCategory } from '@/hooks/useShoes';
import { MainCategory } from '@/types';
import categories from '@/data/categories.json';

interface CategoryPageProps {
  params: Promise<{ main: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { main } = await params;
  const category = categories.main.find((c) => c.id === main);

  if (!category) {
    return { title: '카테고리를 찾을 수 없습니다' };
  }

  return {
    title: `${category.nameKo} | RunPick`,
    description: category.description,
  };
}

export async function generateStaticParams() {
  return categories.main.map((category) => ({
    main: category.id,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { main } = await params;
  const category = categories.main.find((c) => c.id === main);

  if (!category) {
    notFound();
  }

  const shoes = getShoesByCategory(main as MainCategory);

  return <CategoryPageClient category={category} shoes={shoes} />;
}
