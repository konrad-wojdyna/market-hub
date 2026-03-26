import { Plus } from "lucide-react";
import { Navbar } from "../../components";
import { CategoryCard, LinksMenu, CategoryTable } from "../../components";

const AdminPage = () => {
  return (
    <section>
      <Navbar />
      <div className="xl:flex gap-5">
        <LinksMenu />
        <div className="flex-1 bg-gray-50 p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-black">Kategorie</p>
              <p className="text-sm text-gray-500">
                Zarządzaj kategoriami ogłoszeń
              </p>
            </div>
            <button
              className="flex items-center gap-1 p-2 bg-blue-700
            rounded-md text-white font-bold"
            >
              <Plus size={14} />
              Dodaj kategorię
            </button>
          </div>
          <div className="flex justify-between gap-10 max-w-150 mt-5 mb-5">
            <CategoryCard
              primaryText="Wszystkie"
              amount={8}
              className="text-black"
            />
            <CategoryCard
              primaryText="Aktywne"
              amount={7}
              className="text-green-600"
            />
            <CategoryCard
              primaryText="Nieaktywne"
              amount={1}
              className="text-gray-500"
            />
          </div>
          <CategoryTable />
        </div>
      </div>
    </section>
  );
};
export default AdminPage;
