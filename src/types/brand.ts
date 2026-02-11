import { BrandId } from './shoe';

export interface Brand {
  id: BrandId;
  name: string;
  nameKo: string;
  description: string;
  tagline: string;
  color: string;
  secondaryColor: string;
  logo: string;
  heroImage: string;
}
