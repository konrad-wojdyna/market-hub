import type { Dispatch, SetStateAction } from "react";
import { Menu, House } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

type NavbarProps = {
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const Navbar = ({ setIsSidebarOpen }: NavbarProps) => {
  const { user, isAuthenticated, isInitialized, logout } = useAuthContext();

  if (!isInitialized) return null;

  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "";

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-brand rounded-md flex items-center justify-center">
            <House size={16} className="text-white" />
          </div>
          <span className="text-xl font-semibold">
            <span className="text-brand">Market</span>
            <span className="text-text-heading">Hub</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-sm font-medium text-brand"
                : "text-sm text-gray-500 hover:text-gray-800 transition-colors"
            }
          >
            Ogłoszenia
          </NavLink>
          {isAuthenticated && (
            <NavLink
              to="/messages"
              className={({ isActive }) =>
                isActive
                  ? "text-sm font-medium text-brand"
                  : "text-sm text-gray-500 hover:text-gray-800 transition-colors"
              }
            >
              Wiadomości
            </NavLink>
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center">
                <span className="text-xs font-semibold text-brand-hover">
                  {initials}
                </span>
              </div>
              <span className="text-sm font-medium text-text-heading">
                {user?.firstName}
              </span>

              {/* Separator */}
              <div className="w-px h-5 bg-gray-200" />

              <button
                type="button"
                onClick={logout}
                className="text-sm text-gray-500 hover:text-brand transition-colors cursor-pointer"
              >
                Wyloguj
              </button>
              <Link
                to="/listings/new"
                className="bg-brand hover:bg-brand-hover text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
              >
                + Dodaj ogłoszenie
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-brand transition-colors border border-brand px-4 py-2 rounded-md"
              >
                Zaloguj się
              </Link>
              <Link
                to="/register"
                className="bg-brand hover:bg-brand-hover text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
              >
                Zarejestruj się
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsSidebarOpen((open) => !open)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Otwórz menu"
        >
          <Menu size={20} className="text-gray-700" />
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
