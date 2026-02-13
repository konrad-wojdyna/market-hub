import type { Listing } from "../../types/listing";
import Loading from "../shared/LoadingComponent";
import ListingCard from "./ListingCard";

const ListingList = ({
  listings,
  isLoading,
}: {
  listings: Listing[];
  isLoading: boolean;
}) => {
  return (
    <div>
      <div className="mt-2 mb-8">
        <h1 className="text-3xl font-bold ">Browse Listings</h1>
        <h2 className="text-lg text-gray-500">
          Discover great deals in your area
        </h2>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-6">
          {listings?.map((listing) => {
            return <ListingCard key={listing.id} {...listing} />;
          })}
        </div>
      )}
    </div>
  );
};
export default ListingList;
