import type { ListingFormData } from "../schemas/listingSchema";
import type { Listing, ListingSearchParams } from "../types/listing";
import type { Page } from "../types/page";
import { api } from "./api";

class ListingService {
  async getAllListing(
    searchParams?: Partial<ListingSearchParams>,
  ): Promise<Page<Listing>> {
    const response = await api.get("/listings", {
      params: searchParams,
    });
    return response.data;
  }

  async getListingById(id: number): Promise<Listing> {
    const response = await api.get(`/listings/${id}`);
    return response.data;
  }

  async createListing(data: ListingFormData): Promise<Listing> {
    const response = await api.post<Listing>(`/listings`, data);
    return response.data;
  }

  async updateListing(id: number, data: ListingFormData): Promise<Listing> {
    const response = await api.put<Listing>(`/listings/${id}`, data);
    return response.data;
  }

  async deleteListing(id: number): Promise<void> {
    await api.delete<void>(`/listings/${id}`);
  }
}

export default new ListingService();
