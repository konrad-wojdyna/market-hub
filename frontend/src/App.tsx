import { BrowserRouter, Routes, Route } from "react-router";
import { ListingPage, CreateListingPage } from "./pages";

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
      </Routes>
    </BrowserRouter>
  );
};
export default App;
