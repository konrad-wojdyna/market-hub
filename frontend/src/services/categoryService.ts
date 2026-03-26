import type {
  Category,
  CreateCategoryData,
  UpdateCategoryData,
} from "../types/category";
import { api } from "./api";

class CategoryService {
  async getAllCategories(): Promise<Category[]> {
    const response = await api.get("/categories");
    return response.data;
  }

  async getCategoryById(id: number): Promise<Category> {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  }

  async getActiveCategories(): Promise<Category[]> {
    const response = await api.get(`/categories/active`);
    return response.data;
  }

  async createCategory(data: CreateCategoryData): Promise<Category> {
    const response = await api.post<Category>(`/categories`, data);
    return response.data;
  }

  async editCategory(id: number, data: UpdateCategoryData): Promise<Category> {
    const response = await api.put<Category>(`/categories/${id}`, data);
    return response.data;
  }

  async deleteCategory(id: number): Promise<void> {
    await api.delete<void>(`/categories/${id}`);
  }

  async changeCategoryStatus(id: number): Promise<Category> {
    const response = await api.patch(`/categories/${id}/status`);
    return response.data;
  }
}

export default new CategoryService();
