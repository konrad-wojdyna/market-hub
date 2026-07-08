export type FeaturedDurationCode = "SEVEN_DAYS" | "FOURTEEN_DAYS";

export interface FeaturedDurationOption {
  name: FeaturedDurationCode;
  price: number;
  duration: number;
}

type PaymentProvider = "stripe";

export interface PaymentRequest {
  listingId: number;
  duration: FeaturedDurationCode;
  currency: string;
  paymentProvider: PaymentProvider;
}

type PaymentStatus = "PENDING" | "SUCCEEDED" | "FAILED";

export interface PaymentResponse {
  providerPaymentId: string;
  clientSecret: string;
  status: PaymentStatus;
}
