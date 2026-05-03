import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { useState } from "react";
import Sidebar from "../Sidebar";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <section>
      <Navbar setIsSidebarOpen={setIsSidebarOpen} />
      <Outlet />
      <Sidebar isSidebarOpen={isSidebarOpen} />
      {/* <Footer /> */}
    </section>
  );
};
export default MainLayout;
