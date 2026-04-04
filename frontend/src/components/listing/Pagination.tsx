import { getPaginationRange } from "../../utils/getPaginationRange";
import { ArrowLeft, ArrowRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const PaginationButton = ({
  pageNumber,
  currentPage,
  onPageChange,
}: {
  pageNumber: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <button
      className={`px-3 py-1 border-2 border-gray-200 rounded-md cursor-pointer
        ${currentPage === Number(pageNumber) && "bg-blue-700 text-white"}`}
      onClick={() => onPageChange(Number(pageNumber) - 1)}
      aria-current={currentPage === pageNumber - 1 ? "page" : undefined}
    >
      {pageNumber}
    </button>
  );
};

const Pagination = (props: PaginationProps) => {
  const pages = getPaginationRange(props.currentPage + 1, props.totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="flex gap-2 items-center justify-center mt-5 mb-3"
    >
      <button
        disabled={props.currentPage <= 0}
        className={`flex gap-1 p-1 rounded-md cursor-pointer border-2 border-gray-200
          ${props.currentPage <= 0 && "text-gray-400"}`}
        onClick={() => props.onPageChange(props.currentPage - 1)}
      >
        <ArrowLeft />
        Poprzednia
      </button>
      <div className="flex gap-2">
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`dots-${index}`} className="px-3 py-1 text-gray-400">
                ...
              </span>
            );
          }
          return (
            <PaginationButton
              key={page}
              pageNumber={Number(page)}
              currentPage={props.currentPage}
              onPageChange={props.onPageChange}
            />
          );
        })}
      </div>
      <button
        disabled={props.currentPage === props.totalPages - 1}
        className={`flex gap-1 p-1 rounded-md cursor-pointer border-2 border-gray-200
          ${props.currentPage === props.totalPages - 1 && "text-gray-400"}`}
        onClick={() => props.onPageChange(props.currentPage + 1)}
      >
        <ArrowRight />
        Następna
      </button>
    </nav>
  );
};
export default Pagination;
