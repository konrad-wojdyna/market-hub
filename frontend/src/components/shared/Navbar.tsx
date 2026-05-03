import type { Dispatch, SetStateAction } from "react";
import { Menu, House } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

type NavbarProps = {
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const Navbar = ({ setIsSidebarOpen }: NavbarProps) => {
  const { user, isAuthenticated, isInitialized, logout } = useAuthContext();

  if (!isInitialized) return null;

  return (
    <nav className="flex justify-between items-center p-4 bg-brand-light">
      <div className="flex items-center gap-2 text-2xl font-bold">
        <House className="text-white bg-brand p-1 rounded-sm" />
        <span className="flex items-center text-xl font-bold">
          <span className="text-brand">Market</span>Hub
        </span>
      </div>
      {isAuthenticated ? (
        <>
          <div className="flex items-center gap-2">
            <ul>
              <li>
                <Link to="/listings">MyListings</Link>
              </li>
            </ul>
            <div>
              <p>{user?.firstName}</p>
              <button
                type="button"
                onClick={logout}
                className="text-sm text-gray-500 hover:text-brand cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex gap-2">
          <Menu
            onClick={() => setIsSidebarOpen((open) => !open)}
            className="cursor-pointer"
          />
          {/* <Link to="/login">Login</Link>
          <Link to="/register">Register</Link> */}
        </div>
      )}
    </nav>
  );
};
export default Navbar;
