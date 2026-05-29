import { useForm } from "react-hook-form";
import { type SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useUpdateListing } from "../../hooks/useUpdateListing";
import { useEffect } from "react";
import { useCategories } from "../../hooks/useCategories";
import Loading from "../shared/LoadingComponent";
import { ErrorComponent } from "..";
import FormField from "./FormField";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  listingSchema,
  type ListingFormData,
} from "../../schemas/listingSchema";

const EditListingForm = () => {
  const { id } = useParams();
  const { categories, error, isLoading } = useCategories(true);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
  });

  const { updateListing, initialData } = useUpdateListing(Number(id));

  const onSubmit: SubmitHandler<ListingFormData> = async (data) => {
    try {
      await updateListing(data);
      navigate(`/listings/${id}`);
    } catch {
      //error handled in useUpdateListing (toast)
    }
  };

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorComponent message={error} />;
  }

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 p-4 m-4 w-full max-w-225 shadow-lg rounded-md border border-gray-200"
      >
        <FormField label="Title *" errors={errors} name="title">
          <input
            type="text"
            id="title"
            placeholder="e.g., iPhone 13 Pro - Like New"
            {...register("title")}
            aria-invalid={errors.title ? "true" : "false"}
            className="border border-gray-300 p-2 rounded-lg"
          />
        </FormField>
        <FormField label="Description" errors={errors} name="description">
          <textarea
            id="description"
            rows={6}
            cols={8}
            placeholder="Describe your item in detail..."
            {...register("description")}
            className="border border-gray-300 p-2 rounded-lg"
          ></textarea>
          <small className="text-gray-600">
            Optional - but listings with descriptions sell faster!
          </small>
        </FormField>
        <FormField label="Price (PLN)" errors={errors} name="price">
          <input
            type="number"
            id="price"
            step="0.01"
            required
            placeholder="0.00"
            {...register("price", { valueAsNumber: true })}
            className="border border-gray-300 p-2 rounded-lg"
          />
        </FormField>
        <FormField label="Category *" errors={errors} name="categoryId">
          <select
            id="category"
            defaultValue=""
            required
            {...register("categoryId", { valueAsNumber: true })}
            className="border border-gray-300 p-2 rounded-lg"
          >
            <option value="" disabled hidden>
              Select a category
            </option>
            {categories?.map((cat) => {
              return (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              );
            })}
          </select>
        </FormField>
        <FormField label="Location" errors={errors} name="location">
          <input
            type="text"
            id="location"
            {...register("location")}
            placeholder="e.g., Warsaw, Krakow"
            className="border border-gray-300 p-2 rounded-lg"
          />
          <small className="text-gray-600">
            Optional - helps buyers find local items
          </small>
        </FormField>
        <div className="flex justify-between p-2">
          <button
            type="button"
            className="border border-gray-300 py-2 px-4 rounded-lg cursor-pointer
          transition-all hover:bg-gray-50"
            onClick={() => navigate("/listings")}
          >
            Cancel
          </button>
          <button
            disabled={isSubmitting}
            type="submit"
            className={`border bg-blue-600 text-white font-bold tracking-wide py-2 px-4 rounded-lg cursor-pointer
          transition-all hover:bg-blue-700 ${isSubmitting && "opacity-50 cursor-not-allowed"}`}
          >
            {isSubmitting ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditListingForm;
