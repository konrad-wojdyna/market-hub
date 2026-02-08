import { toast } from "react-toastify";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { CreateListingData, UpdateListingData } from "../../types/listing";
import listingService from "../../services/listingService";
import { useParams, useNavigate } from "react-router-dom";
import { CATEGORIES } from "../../types/listing";
import { useEffect } from "react";

const EditListingForm = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateListingData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listingService.getListingById(Number(id));
        reset(data);
      } catch (error) {
        const errorMsg =
          error instanceof Error
            ? error.message
            : "Something went wrong. Pleasy try again!";
        toast.error(errorMsg);
      }
    };

    if (id) fetchData();
  }, [id, reset]);

  const onSubmit: SubmitHandler<UpdateListingData> = async (data) => {
    try {
      const response = await listingService.updateListing(Number(id), data);
      console.log(response);
      toast.success("Listing updated!");
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Something went wrong. Pleasy try again!";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 p-4 m-4 w-full max-w-225 shadow-lg rounded-md border border-gray-200"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-bold tracking-wide">
            Title *
          </label>
          <input
            type="text"
            id="title"
            placeholder="e.g., iPhone 13 Pro - Like New"
            {...register("title", {
              required: "Title is required",
              minLength: { value: 3, message: "Min 3 characters" },
              maxLength: { value: 50, message: "Max 50 characters" },
            })}
            aria-invalid={errors.title ? "true" : "false"}
            className="border border-gray-300 p-2 rounded-lg"
          />
          {errors.title && (
            <p className="text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-bold tracking-wide">
            Description{" "}
          </label>
          <textarea
            id="description"
            rows={6}
            cols={8}
            placeholder="Describe your item in detail..."
            {...register("description")}
            className="border border-gray-300 p-2 rounded-lg"
          ></textarea>
          <small className="text-gray-600">
            Optional - but lisitngs with descriptions sell faster!
          </small>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="price" className="font-bold tracking-wide">
            Price (PLN) *
          </label>
          <input
            type="number"
            id="price"
            step="0.01"
            required
            placeholder="0.00"
            {...register("price", {
              required: "Price is required",
              min: { value: 0.01, message: "Price must be positive" },
            })}
            className="border border-gray-300 p-2 rounded-lg"
          />
          {errors.price && (
            <p className="text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="font-bold tracking-wide">
            Category *
          </label>
          <select
            id="category"
            defaultValue=""
            required
            {...register("category")}
            className="border border-gray-300 p-2 rounded-lg"
          >
            <option value="" disabled hidden>
              Select a category
            </option>
            {CATEGORIES?.map((name) => {
              return (
                <option key={name} value={name.toLocaleLowerCase()}>
                  {name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="location" className="font-bold tracking-wide">
            Location
          </label>
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
        </div>
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
