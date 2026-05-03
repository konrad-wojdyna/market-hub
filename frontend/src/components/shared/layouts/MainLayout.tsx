import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { useState } from "react";
import Sidebar from "../Sidebar";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-page-bg">
      <Navbar setIsSidebarOpen={setIsSidebarOpen} />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <main className="flex-1">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};
export default MainLayout;
