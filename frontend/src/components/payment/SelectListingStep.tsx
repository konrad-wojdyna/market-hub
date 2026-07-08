import { useState } from "react";
import { type Listing } from "../../types/listing";
import { formatDate } from "../../utils/formatDate";
import { getMainImage } from "../../utils/getMainImage";

type SelectListingStepProps = {
  listings: Listing[];
  selectedListing: Listing | null;
  onSelect: (listing: Listing | null) => void;
};

const SelectListingStep = ({
  listings,
  selectedListing,
  onSelect,
}: SelectListingStepProps) => {
  const [highlighted, setHighlighted] = useState<Listing | null>(
    selectedListing,
  );

  return (
    <div>
      <h3 className="text-lg font-bold tracking-wide text-gray-900">
        Select a listing
      </h3>
      <p className="text-gray-500 mt-2">
        Which listing do you want to feature?
      </p>
      <ul className="flex flex-col gap-2 mt-3 mb-3">
        {listings.map((l) => {
          return (
            <li
              key={l.id}
              onClick={() => setHighlighted(l)}
              className={`flex items-center justify-between gap-2 rounded-md p-1 border 
                ${highlighted === l ? "border-black" : "border-gray-300"}`}
            >
              <div className="flex gap-1 items-center">
                <img
                  src={getMainImage(l.images)}
                  alt={l.title}
                  className="h-15 w-15"
                />
                <div>
                  <h3 className="font-bold">{l.title}</h3>
                  <p>Added: {formatDate(l.createdAt)}</p>
                </div>
              </div>
              <p className="text-purple-700 font-bold">{l.price} PLN</p>
            </li>
          );
        })}
      </ul>
      <button
        disabled={highlighted === null}
        onClick={() => onSelect(highlighted)}
        className={`w-full p-2 mt-3 mb-2 rounded-md text-white bg-gray-400
           ${highlighted !== null && "cursor-pointer bg-teal-600"}`}
      >
        Continue
      </button>
    </div>
  );
};
export default SelectListingStep;
