import { type ListingImage } from "../types/listingImage";
import no_image from "../assets/no-picture.png";

export const getMainImage = (images: ListingImage[]) => {
  return images?.find((img) => img.isMain)?.url ?? images?.[0]?.url ?? no_image;
};
