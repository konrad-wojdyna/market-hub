import { BrowserRouter, Routes, Route } from "react-router";
import { ListingPage } from "./pages";

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
      </Routes>
    </BrowserRouter>
  );
};
export default App;
