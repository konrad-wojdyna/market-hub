import axios from "axios";
import { useEffect, useState } from "react";
import { ListingList, ErrorComponent } from "../components";
import listingService from "../services/listingService";
import type { Listing } from "../types/listing";

const ListingPage = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({
    isError: false,
    errorMsg: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const listings = await listingService.getAllListing();
        setListings(listings);
      } catch (err) {
        let errorMsg = "Something went wrong. Please try again...";

        if (axios.isAxiosError(err)) {
          errorMsg = err.response?.data?.message || err.message;
        } else if (err instanceof Error) {
          errorMsg = err.message;
        }

        setError({
          isError: true,
          errorMsg,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error.isError) {
    return <ErrorComponent message={error.errorMsg} />;
  }

  return (
    <section className="p-5">
      <ListingList listings={listings} isLoading={isLoading} />
    </section>
  );
};
export default ListingPage;
