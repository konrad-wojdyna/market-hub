import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { ErrorComponent } from "..";
import { formatPrice } from "../../utils/formatPrice";

type CheckoutFormProps = {
  price: number;
  onBack: () => void;
  onSuccess: () => void;
};

const CheckoutForm = ({ price, onSuccess, onBack }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message ?? "Please check your card details.");
      setIsProcessing(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/my-listings`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message ?? "Payment failed. Please try again.");
      setIsProcessing(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <PaymentElement />
      {errorMessage && <ErrorComponent message={errorMessage} />}
      <div className="flex gap-2 mt-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isProcessing}
          className="flex-1 p-2 rounded-md border text-black bg-white"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!stripe || !elements || isProcessing}
          className="flex-2 p-2 rounded-md text-white bg-teal-600 disabled:bg-gray-400"
        >
          {isProcessing ? "Processing..." : `Pay ${formatPrice(price)}`}
        </button>
      </div>
    </form>
  );
};
export default CheckoutForm;
