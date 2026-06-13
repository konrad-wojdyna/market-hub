import type { UserProfile } from "../types/userProfile";
import type { UserProfileFormData } from "../schemas/userProfileSchema";
import { api } from "./api";

class UserProfileService {
  async createOrUpdateUserProfile(
    data: UserProfileFormData,
  ): Promise<UserProfile> {
    const response = await api.put("/users/profile", data);
    return response.data;
  }

  async getUserProfileById(id: number): Promise<UserProfile> {
    const response = await api(`/users/${id}/profile`);
    return response.data;
  }

  async deleteUserProfile(): Promise<void> {
    await api.delete("/users/profile");
  }
}

export default new UserProfileService();
