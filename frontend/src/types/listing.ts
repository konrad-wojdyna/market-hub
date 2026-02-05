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
