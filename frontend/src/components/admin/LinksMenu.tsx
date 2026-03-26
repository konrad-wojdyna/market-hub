import { Link } from "react-router-dom";
import { TableOfContents, CircleUser, ScrollText, Plus } from "lucide-react";

const adminLinksMenu = [
  {
    id: 1,
    name: "Kategorie",
    link: "/admin-category",
    icon: <TableOfContents size={18} />,
  },
  {
    id: 2,
    name: "Użytkownicy",
    link: "/admin-users",
    icon: <CircleUser size={18} />,
  },
  {
    id: 3,
    name: "Ogłoszenia",
    link: "/admin-listings",
    icon: <ScrollText size={18} />,
  },
];

const AdminLinksMenu = () => {
  return (
    <ul>
      {adminLinksMenu?.map((link) => {
        return (
          <li key={link.id}>
            <Link
              to={link.link}
              className="flex gap-2 items-center text-lx
                  active:text-blue-500 hover:text-gray-600 text-gray-800 transition-all"
            >
              {link.icon}
              {link.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default AdminLinksMenu;
