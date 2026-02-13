export interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  createdAt: string;
}

export interface CreateListingData {
  title: string;
  description?: string;
  price: number;
  category: string;
  location?: string;
}

export interface UpdateListingData {
  title: string;
  description?: string;
  price: number;
  category: string;
  location?: string;
}

export const CATEGORIES = [
  "Electronics",
  "Furniture",
  "Automotive",
  "Books",
  "Fashion",
  "Sports",
] as const;

export type Category = (typeof CATEGORIES)[number];
