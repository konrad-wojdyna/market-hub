import { useState } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import type { Listing } from "../../types/listing";
import SelectListingStep from "./SelectListingStep";
import SelectDurationStep from "./SelectDurationStep";
import PaymentStep from "./PaymentStep";
import { useFeaturedDurations } from "../../hooks/useFeaturedDurations";
import type { FeaturedDurationOption } from "../../types/payment";

type FeatureListingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  listings: Listing[];
};

type Step = "select-listing" | "select-duration" | "payment";

const FeatureListingModal = ({
  isOpen,
  onClose,
  listings,
}: FeatureListingModalProps) => {
  const [step, setStep] = useState<Step>("select-listing");
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [selectedDurationOption, setSelectedDurationOption] =
    useState<FeaturedDurationOption | null>(null);

  const STEPS: Step[] = ["select-listing", "select-duration", "payment"];
  const currentIndex = STEPS.indexOf(step);

  const {
    featuredOptions,
    isLoading: isLoadingFeaturedDuration,
    error: errorFeaturedDuration,
  } = useFeaturedDurations();

  const handleSelectListing = (listing: Listing | null) => {
    setSelectedListing(listing);
    setStep("select-duration");
  };

  const handleSelectDuration = (duration: FeaturedDurationOption | null) => {
    setSelectedDurationOption(duration);
    setStep("payment");
  };

  const handleOnBackToSelectListing = () => {
    setStep("select-listing");
  };

  const handleOnBackToSelectDuration = () => {
    setStep("select-duration");
  };

  const handleClose = () => {
    setStep("select-listing");
    setSelectedListing(null);
    setSelectedDurationOption(null);
    onClose();
  };

  if (!isOpen) return null;

  const handleSteps = () => {
    switch (step) {
      case "select-listing":
        return (
          <SelectListingStep
            listings={listings}
            selectedListing={selectedListing}
            onSelect={handleSelectListing}
          />
        );
      case "select-duration":
        return (
          <SelectDurationStep
            selectedListing={selectedListing}
            featuredOptions={featuredOptions}
            selectedDurationOption={selectedDurationOption}
            onSelect={handleSelectDuration}
            onBack={handleOnBackToSelectListing}
            isLoading={isLoadingFeaturedDuration}
            error={errorFeaturedDuration}
          />
        );
      case "payment":
        if (!selectedListing || !selectedDurationOption) return null;
        return (
          <PaymentStep
            listing={selectedListing}
            duration={selectedDurationOption}
            onBack={handleOnBackToSelectDuration}
            onSuccess={handleClose}
          />
        );
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm ">
      <div
        className="flex flex-col gap-2 bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200
      max-h-[90vh] overflow-y-auto"
      >
        <button onClick={handleClose} className="ml-auto cursor-pointer">
          <X />
        </button>
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => {
            return (
              <div
                key={i}
                className={`flex-1 h-[0.4rem] rounded-md ${i <= currentIndex ? "bg-teal-600" : "bg-gray-200"} `}
              ></div>
            );
          })}
        </div>
        {handleSteps()}
      </div>
    </div>,
    document.body,
  );
};
export default FeatureListingModal;
