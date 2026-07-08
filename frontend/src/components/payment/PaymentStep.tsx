import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import type { Listing } from "../../types/listing";
import type { FeaturedDurationOption } from "../../types/payment";
import { useCreatePayment } from "../../hooks/useCreatePayment";
import Loading from "../shared/LoadingComponent";
import { ErrorComponent } from "..";
import { stripePromise } from "../../lib/stripe";
import CheckoutForm from "./CheckoutForm";

type PaymentStepProps = {
  listing: Listing;
  duration: FeaturedDurationOption;
  onBack: () => void;
  onSuccess: () => void;
};

const PaymentStep = ({
  listing,
  duration,
  onBack,
  onSuccess,
}: PaymentStepProps) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const { initPayment, isLoading, error } = useCreatePayment();

  useEffect(() => {
    initPayment({
      listingId: listing.id,
      duration: duration.name,
      currency: "PLN",
      paymentProvider: "stripe",
    }).then((response) => {
      setClientSecret(response.clientSecret);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //Celowo uruchamiane raz przy montowaniu tego kroku - tworzy dokładnie
  //jeden PaymentIntent dla wybranego listingu/duration. Nie ma potrzeby
  //reagowania na zmianę tych propsów, bo komponent i tak odmontowuje się
  //przy powrocie do poprzedniego kroku.

  if (isLoading || !clientSecret) return <Loading />;

  if (error) {
    return (
      <ErrorComponent message="Couldn't start the payment. Please try again." />
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm
        price={duration.price}
        onBack={onBack}
        onSuccess={onSuccess}
      />
    </Elements>
  );
};
export default PaymentStep;
