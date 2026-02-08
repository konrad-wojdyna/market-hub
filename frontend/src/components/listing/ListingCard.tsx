import { MapPin } from "lucide-react";
import no_image from "../../assets/no-picture.png";
import type { Listing } from "../../types/listing";
import { useNavigate } from "react-router-dom";

const ListingCard = ({
  id,
  title,
  price,
  category,
  location,
  createdAt,
}: Listing) => {
  const navigate = useNavigate();

  return (
    <article
      className="bg-white shadow-md rounded-md cursor-pointer"
      onClick={() => navigate(`/listings/${id}`)}
    >
      <img src={no_image} alt={title} className="w-full h-50 object-cover " />
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
          <p className="text-gray-600">{createdAt}</p>
        </div>
      </footer>
    </article>
  );
};
export default ListingCard;
