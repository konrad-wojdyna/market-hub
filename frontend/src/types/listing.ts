export interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  categoryId: number;
  category: string;
  location: string;
  createdAt: string;
  ownerId: number;
}

export interface CreateListingData {
  title: string;
  description?: string;
  price: number;
  categoryId: number;
  location?: string;
}

export interface UpdateListingData {
  title: string;
  description?: string;
  price: number;
  categoryId: number;
  location?: string;
}

export interface ListingSearchParams {
  title?: string;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: number;
  location?: string;
  sort?: string;
  page?: number;
  size?: number;
}
