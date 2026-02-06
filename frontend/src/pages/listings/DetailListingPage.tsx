import { Link, useParams } from "react-router-dom";
import { Navbar } from "../../components";
import no_image from "../../assets/no-picture.png";
import { MapPin, TimerIcon } from "lucide-react";
import type { Listing } from "../../types/listing";
import listingService from "../../services/listingService";
import { useEffect, useState } from "react";

const DetailListingPage = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Listing | null>(null);

  useEffect(() => {
    setIsLoading(false);
    const fetchData = async () => {
      try {
        const response = await listingService.getListingById(Number(id));
        setData(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <section>
      <Navbar />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="flex gap-2 m-5">
            <Link
              to={"/listings"}
              className="text-gray-400 transition-all hover:text-blue-600"
            >
              Listings
            </Link>
            <span>/</span>
            <Link
              to={"/listings"}
              className="text-gray-400 transition-all hover:text-blue-600"
            >
              Electronics
            </Link>
            <span>/</span>
            <p>{data?.title}</p>
          </div>
          <article className="m-5 py-2 bg-white shadow-md rounded-md">
            <img
              src={no_image}
              alt={data?.title}
              className="w-full h-50 object-cover "
            />
            <div className="flex flex-col gap-2 p-4">
              <h2 className="max-w-22 p-1 rounded-lg text-sm tracking-wider font-bold bg-blue-400 text-blue-800">
                {data?.category}
              </h2>
              <h2 className="text-2xl font-bold tracking-wide">
                {data?.title}
              </h2>
              <h3 className="font-bold text-2xl text-purple-700">
                {data?.price} PLN
              </h3>
              <div>
                <p className="text-xl font-bold mb-3">Description</p>
                <p>{data?.description}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 m-5 p-5 rounded-md bg-gray-100">
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-gray-500" />
                <div>
                  <span className="text-gray-500">Location</span>
                  <p>{data?.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <TimerIcon size={20} className="text-gray-500" />
                <div>
                  <span className="text-gray-500">Posted</span>
                  <p>{data?.createdAt}</p>
                </div>
              </div>
            </div>
            <div className="m-5 p-4 rounded-xl">
              {" "}
              {/* Dodałem padding i zaokrąglenie dla tła */}
              <div className="flex items-center justify-center gap-3 max-w-md ml-auto">
                <button className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
                  Edit Listing
                </button>
                <button className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </article>
        </>
      )}
    </section>
  );
};
export default DetailListingPage;
