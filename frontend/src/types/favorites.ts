export interface Favorite {
  id: number;
  createdAt: string;
  listingFavorite: ListingFavorite;
}

interface ListingFavorite {
  id: number;
  title: string;
  price: number;
  mainImage: string | null;
}
