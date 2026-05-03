import { useSearchParams } from "react-router-dom";
import {
  ListingList,
  ErrorComponent,
  SearchFilters,
  Pagination,
} from "../../components";
import { useListings } from "../../hooks/useListings";
import type { ListingSearchParams } from "../../types/listing";

const ListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const mappedParams: ListingSearchParams = {
    title: searchParams.get("title") || undefined,
    location: searchParams.get("location") || undefined,
    categoryId: searchParams.get("categoryId")
      ? Number(searchParams.get("categoryId"))
      : undefined,
    minPrice: searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined,
    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 0,
    size: searchParams.get("size") ? Number(searchParams.get("size")) : 20,
    sort: searchParams.get("sort") || undefined,
  };

  const { error, isLoading, listings } = useListings(mappedParams);

  const handleSearch = (newParams: Partial<ListingSearchParams>) => {
    setSearchParams((prev) => {
      const current = Object.fromEntries(prev.entries());
      const next: Record<string, string> = {
        ...current,
        page: "0",
      };

      Object.entries(newParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          next[key] = String(value);
        } else {
          delete next[key];
        }
      });

      return next;
    });
  };

  const handlePageChange = (newPage: number) => {
    const currentSearch = Object.fromEntries(searchParams.entries());
    setSearchParams({
      ...currentSearch,
      page: String(newPage),
    });
  };

  if (error) {
    return <ErrorComponent message={error} />;
  }

  return (
    <section>
      <SearchFilters onSearch={handleSearch} initialParams={mappedParams} />
      <ListingList listings={listings?.content || []} isLoading={isLoading} />
      <Pagination
        currentPage={mappedParams.page ?? 0}
        totalPages={listings?.totalPages ?? 0}
        onPageChange={handlePageChange}
      />
    </section>
  );
};
export default ListingPage;
