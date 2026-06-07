import type { ListingImage } from "../types/listingImage";
import { api } from "./api";

class ListingImageService {
  async uploadImage(listingId: number, file: File): Promise<ListingImage> {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post(`/listings/${listingId}/images`, formData);
    return response.data;
  }

  async deleteImage(listingId: number, imageId: number): Promise<void> {
    await api.delete<void>(`/listings/${listingId}/images/${imageId}`);
  }

  async getImages(listingId: number): Promise<ListingImage[]> {
    const response = await api.get(`/listings/${listingId}/images`);
    return response.data;
  }
}

export default new ListingImageService();
