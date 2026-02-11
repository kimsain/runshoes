export type BrandId = 'nike' | 'adidas' | 'asics';

export type MainCategory = 'daily' | 'super-trainer' | 'racing';

export type SubCategory =
  | 'beginner'
  | 'max-cushion'
  | 'stability'
  | 'all-rounder'
  | 'lightweight-trainer'
  | 'non-plate'
  | 'light-plate'
  | 'carbon-plate'
  | 'half-marathon'
  | 'full-marathon';

export interface ShoeSpecs {
  weight: number;
  weightSize: string;
  heelStack: number;
  foreStack: number;
  drop: number;
  priceKRW: number;
}

export interface ReviewScore {
  cushioning: number;
  responsiveness: number;
  stability: number;
  durability: number;
  fit: number;
  breathability: number;
  value: number;
}

export interface ShoeImage {
  url: string;
  type: 'main' | 'side' | 'top' | 'sole' | 'detail';
}

export interface Shoe {
  id: string;
  slug: string;
  brandId: BrandId;
  name: string;
  nameKo: string;
  version: string;
  releaseYear: number;
  mainCategory: MainCategory;
  subCategory: SubCategory;
  specs: ShoeSpecs;
  proscons: {
    pros: string[];
    cons: string[];
  };
  images: ShoeImage[];
  tagline: string;
  description: string;
  reviewScore: ReviewScore;
}
