export type ProjectCategory = 'UI' | '平面' | '品牌' | '插画';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  thumbnail: string;
  images: string[];
  description?: string;
  tags?: string[];
  year?: number;
}

export interface CategoryFilter {
  label: string;
  value: ProjectCategory | 'all';
  count?: number;
}