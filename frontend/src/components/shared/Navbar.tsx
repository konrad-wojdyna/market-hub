import { Link } from "react-router-dom";
import { useWebSocket } from "../../hooks/useWebSocket";

const Navbar = () => {
  const { connected } = useWebSocket();

  return (
    <nav className="flex justify-between items-center p-4">
      <p className="text-2xl font-bold text-blue-600">MarketHub</p>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div
            className={`w-2 h-2 rounded-full ${
              connected ? "bg-green-500" : "bg-red-500"
            }`}
          >
            <span className="text-sm text-gray-500">
              {connected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
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
