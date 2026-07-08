export const formatPrice = (priceInCents: number): string =>
  (priceInCents / 100).toFixed(2);
