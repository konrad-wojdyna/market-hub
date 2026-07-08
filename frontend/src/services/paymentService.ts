import { api } from "./api";
import type {
  FeaturedDurationOption,
  PaymentRequest,
  PaymentResponse,
} from "../types/payment";

class PaymentService {
  async createPayment(data: PaymentRequest): Promise<PaymentResponse> {
    const response = await api.post(`/payments`, data);
    return response.data;
  }

  async getFeaturedDurations(): Promise<FeaturedDurationOption[]> {
    const response = await api.get(`/payments/options`);
    return response.data;
  }
}

export default new PaymentService();
