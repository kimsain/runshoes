import { MainCategory, SubCategory } from './shoe';

export interface SubCategoryInfo {
  id: SubCategory;
  name: string;
  nameKo: string;
  description: string;
  icon: string;
}

export interface MainCategoryInfo {
  id: MainCategory;
  name: string;
  nameKo: string;
  description: string;
  icon: string;
  color: string;
  subCategories: SubCategoryInfo[];
}

export interface CategoryStructure {
  main: MainCategoryInfo[];
}
