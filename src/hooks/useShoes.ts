import { useMemo } from 'react';
import { Shoe, BrandId, MainCategory, SubCategory } from '@/types';

import nikeShoes from '@/data/shoes/nike.json';
import adidasShoes from '@/data/shoes/adidas.json';
import asicsShoes from '@/data/shoes/asics.json';

const allShoes: Shoe[] = [
  ...(nikeShoes as Shoe[]),
  ...(adidasShoes as Shoe[]),
  ...(asicsShoes as Shoe[]),
];

export function useShoes() {
  return allShoes;
}

export function useShoesByBrand(brandId: BrandId) {
  return useMemo(() => {
    return allShoes.filter((shoe) => shoe.brandId === brandId);
  }, [brandId]);
}

export function useShoesByCategory(mainCategory: MainCategory, subCategory?: SubCategory) {
  return useMemo(() => {
    return allShoes.filter((shoe) => {
      if (subCategory) {
        return shoe.mainCategory === mainCategory && shoe.subCategory === subCategory;
      }
      return shoe.mainCategory === mainCategory;
    });
  }, [mainCategory, subCategory]);
}

export function useShoeBySlug(slug: string) {
  return useMemo(() => {
    return allShoes.find((shoe) => shoe.slug === slug);
  }, [slug]);
}

export function useShoesById(ids: string[]) {
  return useMemo(() => {
    return allShoes.filter((shoe) => ids.includes(shoe.id));
  }, [ids]);
}

export function getAllShoes(): Shoe[] {
  return allShoes;
}

export function getShoesByBrand(brandId: BrandId): Shoe[] {
  return allShoes.filter((shoe) => shoe.brandId === brandId);
}

export function getShoesByCategory(mainCategory: MainCategory, subCategory?: SubCategory): Shoe[] {
  return allShoes.filter((shoe) => {
    if (subCategory) {
      return shoe.mainCategory === mainCategory && shoe.subCategory === subCategory;
    }
    return shoe.mainCategory === mainCategory;
  });
}

export function getShoeBySlug(slug: string): Shoe | undefined {
  return allShoes.find((shoe) => shoe.slug === slug);
}

export function getShoesById(ids: string[]): Shoe[] {
  return allShoes.filter((shoe) => ids.includes(shoe.id));
}
