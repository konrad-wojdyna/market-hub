import { Plus } from "lucide-react";
import { Navbar, CategoryCard, ListingList } from "../../components";
import { useListings } from "../../hooks/useListings";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";

const MyListingsPage = () => {
  const { user } = useAuthContext();
  const { listings, isLoading, error } = useListings({ ownerId: user?.id });

  return (
    <section className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              My Listings
            </h1>
            <p className="text-sm text-gray-500">Manage your active listings</p>
          </div>
          <Link
            to="/listings/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-600
              hover:bg-teal-700 rounded-lg text-white text-sm font-medium
              transition-colors"
          >
            <Plus size={16} />
            Add Listing
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <CategoryCard
            primaryText="Total listings"
            amount={listings?.totalElements || 0}
            className="text-teal-700"
          />
          <CategoryCard
            primaryText="Total value"
            amount={listings?.content.reduce((sum, l) => sum + l.price, 0) || 0}
            currency="PLN"
            className="text-purple-700"
          />
          <CategoryCard
            primaryText="Avg. price"
            amount={
              listings?.content.length
                ? Math.round(
                    listings.content.reduce((sum, l) => sum + l.price, 0) /
                      listings.content.length,
                  )
                : 0
            }
            currency="PLN"
            className="text-gray-700"
          />
        </div>

        {error && (
          <div
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg
            text-sm text-red-700"
          >
            Something went wrong. Please try again.
          </div>
        )}

        <ListingList listings={listings?.content || []} isLoading={isLoading} />
      </div>
    </section>
  );
};
export default MyListingsPage;
