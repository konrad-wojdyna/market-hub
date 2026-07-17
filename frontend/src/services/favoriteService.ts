import type { Favorite } from "../types/favorites";
import { api } from "./api";

class FavoriteService {
  async getFavorites(): Promise<Favorite[]> {
    const response = await api.get("/favorites");
    return response.data;
  }

  async addFavorite(listingId: number): Promise<Favorite> {
    const response = await api.post("/favorites", { listingId });

    return response.data;
  }

  async removeFavorite(listingId: number): Promise<void> {
    await api.delete(`/favorites/${listingId}`);
  }
}

export default new FavoriteService();
