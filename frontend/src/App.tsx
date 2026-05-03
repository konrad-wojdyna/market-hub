import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router";
import {
  LoginPage,
  RegisterPage,
  ListingPage,
  CreateListingPage,
  DetailListingPage,
  EditListingPage,
  MessagesPage,
  ProtectedRoute,
  AdminPage,
  AdminRoute,
} from "./pages";
import { AuthLayout, MainLayout } from "./components";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route index element={<ListingPage />} />

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/listings/new" element={<CreateListingPage />} />
            <Route path="/listings/:id" element={<DetailListingPage />} />
            <Route path="/listings/:id/edit" element={<EditListingPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route
              path="/messages/:conversationId"
              element={<MessagesPage />}
            />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};
export default App;
