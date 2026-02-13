import type {
  Listing,
  CreateListingData,
  UpdateListingData,
} from "../types/listing";
import { api } from "./api";

class ListingService {
  async getAllListing(): Promise<Listing[]> {
    const response = await api.get("/listings");
    return response.data;
  }

  async getListingById(id: number): Promise<Listing> {
    const response = await api.get(`/listings/${id}`);
    return response.data;
  }

  async createListing(data: CreateListingData): Promise<Listing> {
    const response = await api.post<Listing>(`/listings`, data);
    return response.data;
  }

  async updateListing(id: number, data: UpdateListingData): Promise<Listing> {
    const response = await api.put<Listing>(`/listings/${id}`, data);
    return response.data;
  }

  async deleteListing(id: number): Promise<void> {
    await api.delete<void>(`/listings/${id}`);
  }
}

export default new ListingService();
