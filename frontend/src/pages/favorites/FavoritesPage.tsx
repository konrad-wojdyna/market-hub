import { Link } from "react-router-dom";
import { Heart, HeartOff } from "lucide-react";
import { useFavorites } from "../../hooks/useFavorites";
import { ErrorComponent, Loading } from "../../components";
import { useRemoveFavorite } from "../../hooks/useRemoveFavorite";
import no_picture from "../../assets/no-picture.png";
import { formatDate } from "../../utils/formatDate";

const FavoritesPage = () => {
  const { favorites, isLoading, error } = useFavorites();
  const { removeFavorite } = useRemoveFavorite();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorComponent message="Something went wrong. Please try again!" />;
  }

  const isEmpty = !favorites || favorites.length === 0;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <nav className="flex items-center gap-2  mb-6">
        <Heart
          size={22}
          className={
            isEmpty ? "text-gray-400" : "text-[#D4537E] fill-[#D4537E]"
          }
        />
        <h1 className="text-xl font-bold tracking-wide">Moje ulubione</h1>
        <span className="text-gray-500">{favorites?.length ?? 0}</span>
      </nav>
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center gap-2 py-20 text-center">
          <HeartOff size={56} className="text-gray-300" />
          <p className="font-bold text-lg mt-2">Nie masz jeszcze ulubionych</p>
          <p className="text-gray-600 text-sm">
            Kliknij serduszko przy ogłoszeniu, żeby zapisać je na później.
          </p>
          <Link
            to="/"
            className="mt-4 bg-teal-600 hover:bg-teal-700 transition-colors
                       px-5 py-2.5 rounded-md text-white text-sm font-bold"
          >
            Przeglądaj ogłoszenia
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {favorites?.map((f) => {
            return (
              <li
                key={f.id}
                className="flex items-center gap-4 p-3 bg-white border border-gray-200
                         rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <Link
                  to={`/listings/${f.listingFavorite.id}`}
                  className="flex items-center gap-4 flex-1 min-w-0"
                >
                  <img
                    src={f.listingFavorite.mainImage ?? no_picture}
                    alt={f.listingFavorite.title}
                    className="w-20 h-20 object-cover rounded-md bg-gray-100 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-bold truncate">
                      {f.listingFavorite.title}
                    </p>
                    <p className="text-xl font-bold text-purple-700">
                      {f.listingFavorite.price} PLN
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      dodano {formatDate(f.createdAt)}
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => removeFavorite(f.listingFavorite.id)}
                  aria-label={`Usuń ${f.listingFavorite.title} z ulubionych`}
                  className="p-2 rounded-full text-[#D4537E] hover:bg-pink-50
                           transition-colors cursor-pointer shrink-0"
                >
                  <Heart size={22} className="fill-[#D4537E]" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default FavoritesPage;
