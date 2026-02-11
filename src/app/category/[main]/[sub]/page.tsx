import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SubCategoryPageClient from './SubCategoryPageClient';
import { getShoesByCategory } from '@/hooks/useShoes';
import { MainCategory, SubCategory } from '@/types';
import categories from '@/data/categories.json';

interface SubCategoryPageProps {
  params: Promise<{ main: string; sub: string }>;
}

export async function generateMetadata({ params }: SubCategoryPageProps): Promise<Metadata> {
  const { main, sub } = await params;
  const mainCategory = categories.main.find((c) => c.id === main);
  const subCategory = mainCategory?.subCategories.find((s) => s.id === sub);

  if (!mainCategory || !subCategory) {
    return { title: '카테고리를 찾을 수 없습니다' };
  }

  return {
    title: `${subCategory.nameKo} - ${mainCategory.nameKo} | RunPick`,
    description: subCategory.description,
  };
}

export async function generateStaticParams() {
  const params: { main: string; sub: string }[] = [];

  categories.main.forEach((mainCategory) => {
    mainCategory.subCategories.forEach((subCategory) => {
      params.push({
        main: mainCategory.id,
        sub: subCategory.id,
      });
    });
  });

  return params;
}

export default async function SubCategoryPage({ params }: SubCategoryPageProps) {
  const { main, sub } = await params;
  const mainCategory = categories.main.find((c) => c.id === main);
  const subCategory = mainCategory?.subCategories.find((s) => s.id === sub);

  if (!mainCategory || !subCategory) {
    notFound();
  }

  const shoes = getShoesByCategory(main as MainCategory, sub as SubCategory);

  return (
    <SubCategoryPageClient
      mainCategory={mainCategory}
      subCategory={subCategory}
      shoes={shoes}
    />
  );
}
