import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router";
import {
  LoginPage,
  RegisterPage,
  ListingPage,
  CreateListingPage,
  DetailListingPage,
  EditListingPage,
  MessagesPage,
} from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
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
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/messages/:conversationId" element={<MessagesPage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};
export default App;
