import { FileUser, MessagesSquare, Heart, Bell, UserPen } from "lucide-react";
import { NavLink } from "react-router-dom";

type SidebarProps = {
  isSidebarOpen: boolean;
};

const sidebarLinks = [
  {
    id: 1,
    href: "",
    icon: <FileUser size={20} />,
    title: "Ogłoszenia",
  },
  {
    id: 2,
    href: "",
    icon: <MessagesSquare size={20} />,
    title: "Wiadomości",
  },
  {
    id: 3,
    href: "",
    icon: <Heart size={20} />,
    title: "Ulubione",
  },
  {
    id: 4,
    href: "",
    icon: <Bell size={20} />,
    title: "Powiadomienia",
  },
  {
    id: 5,
    href: "",
    icon: <UserPen size={20} />,
    title: "Twoje konto",
  },
];

const Sidebar = ({ isSidebarOpen }: SidebarProps) => {
  if (!isSidebarOpen) {
    return null;
  }

  return (
    <section
      className="fixed top-14 left-0 z-50 h-screen w-screen flex flex-col
       items-center gap-5
     bg-brand-light"
    >
      <nav className="flex justify-center mt-10 w-full">
        <ul className="flex flex-col gap-3">
          {sidebarLinks?.map((link) => {
            return (
              <li key={link.id}>
                <NavLink to={"#"} className="flex items-center gap-2 text-xl">
                  {link.icon}
                  {link.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      <button>Wyloguj</button>
      <button>Dodaj ogłoszenie</button>
    </section>
  );
};
export default Sidebar;
