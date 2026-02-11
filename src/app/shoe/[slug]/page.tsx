import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ShoeDetail from '@/components/shoes/ShoeDetail';
import { getShoeBySlug, getAllShoes } from '@/hooks/useShoes';

interface ShoePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ShoePageProps): Promise<Metadata> {
  const { slug } = await params;
  const shoe = getShoeBySlug(slug);

  if (!shoe) {
    return { title: '러닝화를 찾을 수 없습니다' };
  }

  return {
    title: `${shoe.nameKo} (${shoe.name}) | RunPick`,
    description: shoe.description,
    openGraph: {
      title: `${shoe.nameKo} (${shoe.name}) | RunPick`,
      description: shoe.tagline,
      images: shoe.images[0]?.url ? [shoe.images[0].url] : [],
    },
  };
}

export async function generateStaticParams() {
  const shoes = getAllShoes();
  return shoes.map((shoe) => ({
    slug: shoe.slug,
  }));
}

export default async function ShoePage({ params }: ShoePageProps) {
  const { slug } = await params;
  const shoe = getShoeBySlug(slug);

  if (!shoe) {
    notFound();
  }

  return <ShoeDetail shoe={shoe} />;
}
