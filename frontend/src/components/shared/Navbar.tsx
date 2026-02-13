import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4">
      <p className="text-2xl font-bold text-blue-600">MarketHub</p>
      <div className="flex items-center gap-2">
        <ul>
          <li>
            <Link to="/listings">MyListings</Link>
          </li>
        </ul>
        <button
          type="button"
          className="border bg-blue-600 text-white font-bold tracking-wide py-2 px-4 rounded-lg cursor-pointer
          transition-all hover:bg-blue-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
