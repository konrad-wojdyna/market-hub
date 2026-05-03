import type { Dispatch, SetStateAction } from "react";
import {
  FileUser,
  MessagesSquare,
  Heart,
  Bell,
  UserPen,
  X,
} from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

type SidebarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const sidebarLinks = [
  {
    id: 1,
    href: "/",
    icon: <FileUser size={20} />,
    title: "Ogłoszenia",
  },
  {
    id: 2,
    href: "/messages",
    icon: <MessagesSquare size={20} />,
    title: "Wiadomości",
  },
  {
    id: 3,
    href: "/favorites",
    icon: <Heart size={20} />,
    title: "Ulubione",
  },
  {
    id: 4,
    href: "/notifications",
    icon: <Bell size={20} />,
    title: "Powiadomienia",
  },
  {
    id: 5,
    href: "/account",
    icon: <UserPen size={20} />,
    title: "Twoje konto",
  },
];

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) => {
  const { user, logout } = useAuthContext();

  const isAuthenticated = true;

  const close = () => setIsSidebarOpen(false);

  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "";

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={close}
        />
      )}

      <aside
        className={`
          fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-xl
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          md:hidden
          ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="h-16 flex items-center justify-between px-5 border-b border-gray-100">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center shrink-0">
                <span className="text-xs font-semibold text-brand-hover">
                  {initials}
                </span>
              </div>
              <span className="text-sm font-medium text-text-heading">
                {user.firstName} {user.lastName}
              </span>
            </div>
          ) : (
            <span className="text-sm font-semibold text-text-heading">
              Menu
            </span>
          )}
          <button
            type="button"
            onClick={close}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Zamknij menu"
          >
            <X size={18} className="text-gray-600" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col gap-1">
            {sidebarLinks.map((link) => (
              <li key={link.id}>
                <NavLink
                  to={link.href}
                  onClick={close}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                      isActive
                        ? "bg-brand-subtle text-brand font-medium"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                >
                  {link.icon}
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-4 py-5 border-t border-gray-100 flex flex-col gap-3">
          {isAuthenticated ? (
            <>
              <Link
                to="/listings/new"
                onClick={close}
                className="w-full bg-brand hover:bg-brand-hover text-white text-sm font-medium px-4 py-2.5 rounded-md transition-colors text-center"
              >
                + Dodaj ogłoszenie
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  close();
                }}
                className="w-full text-sm text-gray-500 hover:text-brand transition-colors cursor-pointer py-2"
              >
                Wyloguj się
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                onClick={close}
                className="w-full bg-brand hover:bg-brand-hover text-white text-sm font-medium px-4 py-2.5 rounded-md transition-colors text-center"
              >
                Zarejestruj się
              </Link>
              <Link
                to="/login"
                onClick={close}
                className="w-full text-center text-sm font-medium text-gray-600 hover:text-brand transition-colors border border-brand px-4 py-2.5 rounded-md"
              >
                Zaloguj się
              </Link>
            </>
          )}
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
