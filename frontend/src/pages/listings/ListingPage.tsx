import { ListingList, ErrorComponent } from "../../components";
import { useAsync } from "../../hooks/useAsync";
import listingService from "../../services/listingService";

const ListingPage = () => {
  // const { error, isLoading, listings } = useListings();
  const {
    error,
    isLoading,
    data: listings,
  } = useAsync({
    service: listingService.getAllListing,
  });

  if (error) {
    return <ErrorComponent message={error} />;
  }

  return (
    <section className="p-5">
      <ListingList listings={listings || []} isLoading={isLoading} />
    </section>
  );
};
export default ListingPage;
