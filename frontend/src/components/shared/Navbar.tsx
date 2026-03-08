import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const Navbar = () => {
  const { user, isAuthenticated, isInitialized, logout } = useAuthContext();

  if (!isInitialized) return null;

  return (
    <nav className="flex justify-between items-center p-4">
      <p className="text-2xl font-bold text-blue-600">MarketHub</p>
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
                className="border bg-blue-600 text-white font-bold tracking-wide py-2 px-4 rounded-lg cursor-pointer
            transition-all hover:bg-blue-700"
              >
                Logout
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex gap-2">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
