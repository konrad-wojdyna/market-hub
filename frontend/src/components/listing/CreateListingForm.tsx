const CATEGORIES = [
  "Electronics",
  "Furniture",
  "Automotive",
  "Books",
  "Fashion",
  "Sports",
];

const CreateListingForm = () => {
  return (
    <div className="flex items-center justify-center">
      <form className="flex flex-col gap-5 p-4 m-4 w-full max-w-225 shadow-lg rounded-md border border-gray-200">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-bold tracking-wide">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="e.g., iPhone 13 Pro - Like New"
            required
            className="border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-bold tracking-wide">
            Description{" "}
          </label>
          <textarea
            name="description"
            id="description"
            rows={6}
            cols={8}
            placeholder="Describe your item in detail..."
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
            name="price"
            required
            placeholder="0.00"
            className="border border-gray-300 p-2 rounded-lg"
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="font-bold tracking-wide">
            Category *
          </label>
          <select
            name="category"
            id="category"
            defaultValue=""
            required
            className="border border-gray-300 p-2 rounded-lg"
          >
            <option value="" disabled hidden>
              Select a category
            </option>
            {CATEGORIES?.map((name, index) => {
              return (
                <option key={index} value={name.toLocaleLowerCase()}>
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
            name="location"
            placeholder="e.g., Warsaw, Krakow"
            className="border border-gray-300 p-2 rounded-lg"
          />
          <small className="text-gray-600">
            Optional - helps buyers find local items
          </small>
        </div>
        <div className="flex justify-between p-2">
          <button
            type="reset"
            className="border border-gray-300 py-2 px-4 rounded-lg cursor-pointer
          transition-all hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="border bg-blue-600 text-white font-bold tracking-wide py-2 px-4 rounded-lg cursor-pointer
          transition-all hover:bg-blue-700"
          >
            Create Listing
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateListingForm;
