import { Link, useParams } from "react-router-dom";
import { Navbar } from "../../components";
import { EditListingForm } from "../../components";

const EditListingPage = () => {
  return (
    <section>
      <Navbar />
      <div className="flex gap-2 m-5">
        <Link
          to={"/listings"}
          className="text-gray-400 transition-all hover:text-blue-600"
        >
          Listings
        </Link>
        <span>/</span>
        <Link
          to={"/listings/8"}
          className="text-gray-400 transition-all hover:text-blue-600"
        >
          iPhone 13 Pro
        </Link>
        <span>/</span>
        <p>Edit</p>
      </div>
      <div className="m-5">
        <h1 className="text-3xl font-bold ">Edit Listing</h1>
        <h2 className="text-lg text-gray-500">
          Update your listing details below
        </h2>
      </div>
      <EditListingForm />
    </section>
  );
};
export default EditListingPage;
