import { Check } from "lucide-react";
import type { Listing } from "../../types/listing";
import type {
  FeaturedDurationOption,
  FeaturedDurationCode,
} from "../../types/payment";
import Loading from "../shared/LoadingComponent";
import ErrorComponent from "../shared/ErrorComponent";
import { formatPrice } from "../../utils/formatPrice";
import { useState } from "react";

type SelectDurationStepProps = {
  selectedListing: Listing | null;
  featuredOptions: FeaturedDurationOption[] | undefined;
  selectedDurationOption: FeaturedDurationOption | null;
  onSelect: (duration: FeaturedDurationOption | null) => void;
  onBack: () => void;
  isLoading: boolean;
  error: Error | null;
};

const DURATION_LABELS: Record<FeaturedDurationCode, string> = {
  SEVEN_DAYS: "Basic visibility boost",
  FOURTEEN_DAYS: "Maximum visibility boost",
};

const SelectDurationStep = ({
  selectedListing,
  featuredOptions,
  selectedDurationOption,
  onSelect,
  onBack,
  isLoading,
  error,
}: SelectDurationStepProps) => {
  const [highlighted, setHighlighted] = useState<FeaturedDurationOption | null>(
    selectedDurationOption,
  );

  return (
    <div className="mt-3">
      <div className="p-2 bg-amber-100 rounded-md">
        <p className="flex items-end gap-1">
          <Check size={18} className="text-green-700" />{" "}
          {selectedListing?.title}
        </p>
      </div>
      <div className="mt-3">
        <h3 className="text-lg font-bold tracking-wide text-gray-900">
          Choose duration
        </h3>
        <p className="text-gray-500 ">
          Your listing will appear at the top of search results.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {isLoading ? (
          <Loading />
        ) : (
          featuredOptions?.map((f) => {
            return (
              <div
                key={f.duration}
                onClick={() => setHighlighted(f)}
                className={`flex justify-between items-center p-2 border-2
                 rounded-md ${highlighted === f ? "border-black" : "border-gray-300"}`}
              >
                <div>
                  <h3 className="font-bold">{f.duration} days</h3>
                  <p className="text-sm">{DURATION_LABELS[f.name]}</p>
                </div>
                <div className=" flex items-center gap-1 text-purple-600 font-bold">
                  <p>{formatPrice(f.price)}</p>
                  <small>PLN</small>
                </div>
              </div>
            );
          })
        )}
      </div>
      {error && (
        <ErrorComponent message="Something went wrong... Please try again" />
      )}
      <div className="flex gap-2">
        <button
          onClick={onBack}
          className="flex-1 p-2 mt-3 mb-2 rounded-md border 
            text-black bg-white duration-200
            hover:bg-gray-600
            hover:text-white cursor-pointer"
        >
          Back
        </button>
        <button
          disabled={highlighted === null}
          onClick={() => onSelect(highlighted)}
          className={`flex-2  p-2 mt-3 mb-2 rounded-md 
            text-white bg-gray-400
            duration-200
             ${highlighted !== null && "cursor-pointer bg-teal-600 hover:bg-teal-800"}`}
        >
          Continue to payment
        </button>
      </div>
    </div>
  );
};
export default SelectDurationStep;
