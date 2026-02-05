import { CreateListingForm } from "../components";

const CreateListingPage = () => {
  return (
    <section>
      <div className="m-5">
        <h1 className="text-3xl font-bold ">Create New Listing</h1>
        <h2 className="text-lg text-gray-500">
          Fill in the details below to list your item
        </h2>
      </div>
      <CreateListingForm />
    </section>
  );
};
export default CreateListingPage;
