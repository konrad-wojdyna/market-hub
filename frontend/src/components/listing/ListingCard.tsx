import { MapPin, Star, Heart } from "lucide-react";
import type { Listing } from "../../types/listing";
import { useNavigate } from "react-router-dom";
import { getMainImage } from "../../utils/getMainImage";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useAddFavorite } from "../../hooks/useAddFavorite";
import { useRemoveFavorite } from "../../hooks/useRemoveFavorite";
import { formatDate } from "../../utils/formatDate";

const ListingCard = ({
  id,
  title,
  price,
  category,
  location,
  createdAt,
  images,
  ownerId,
  isFeatured,
  isFavorite,
}: Listing) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const { addFavorite } = useAddFavorite();
  const { removeFavorite } = useRemoveFavorite();

  const mainImage = getMainImage(images);

  const canFavorite = Boolean(user) && user?.id !== ownerId;

  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isFavorite) {
      removeFavorite(id);
      return;
    }
    addFavorite(id);
  };

  return (
    <article
      className={`relative bg-white shadow-md rounded-md cursor-pointer
         ${isFeatured ? "border-2 border-[#1D9E75]" : ""}`}
      onClick={() => navigate(`/listings/${id}`)}
    >
      {isFeatured && (
        <div
          className="absolute top-3 left-3 flex items-center
           gap-1 bg-[#0F6E56] text-white p-1 rounded-md"
        >
          <Star size={15} />
          <p className="text-sm font-bold tracking-wide">Promowane</p>
        </div>
      )}

      {canFavorite && (
        <button
          type="button"
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90
                     hover:bg-white shadow-sm cursor-pointer"
        >
          <Heart
            size={20}
            className={
              isFavorite
                ? "fill-red-500 text-red-500"
                : "fill-transparent text-gray-500 hover:text-red-400"
            }
          />
        </button>
      )}

      <img
        src={mainImage}
        alt={title}
        className="m-auto w-60 h-48 object-fit"
      />
      <main className="flex flex-col gap-2 p-4">
        <h2 className="max-w-22 p-1 rounded-lg text-sm tracking-wider font-bold bg-blue-400 text-blue-800">
          {category}
        </h2>
        <h2 className="text-lg font-bold tracking-wide">{title}</h2>
        <h3 className="font-bold text-2xl text-purple-700">{price} PLN</h3>
      </main>
      <footer>
        <div className="flex justify-between p-4">
          <p className="flex gap-1 items-center text-sm text-gray-600">
            <MapPin size={20} />
            {location}
          </p>
          <p className="text-gray-600">{formatDate(createdAt)}</p>
        </div>
      </footer>
    </article>
  );
};
export default ListingCard;
