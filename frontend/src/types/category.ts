export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  displayOrder: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryData {
  name: string;
  slug: string;
  icon?: string;
  displayOrder?: number;
  active?: boolean;
}

export interface UpdateCategoryData {
  name: string;
  slug: string;
  icon?: string;
  displayOrder?: number;
  active?: boolean;
}
