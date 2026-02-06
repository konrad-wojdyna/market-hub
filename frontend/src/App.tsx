import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router";
import {
  ListingPage,
  CreateListingPage,
  DetailListingPage,
  EditListingPage,
} from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <div>
              <h1>HomePage</h1>
            </div>
          }
        />
        <Route path="/listings" element={<ListingPage />} />
        <Route path="/listings/new" element={<CreateListingPage />} />
        <Route path="/listings/:id" element={<DetailListingPage />} />
        <Route path="/listings/:id/edit" element={<EditListingPage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};
export default App;
