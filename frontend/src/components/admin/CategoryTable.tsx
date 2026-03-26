import { ErrorComponent } from "..";
import { useCategories } from "../../hooks/useCategories";
import Loading from "../shared/LoadingComponent";

const tableHead = [
  {
    id: 1,
    name: "Kolejność",
  },
  {
    id: 2,
    name: "Nazwa",
  },
  {
    id: 3,
    name: "Slug",
  },
  {
    id: 4,
    name: "Status",
  },
  {
    id: 5,
    name: "Akcje",
  },
];

type CategoryButtonProps = {
  text: string;
};

const CategoryButton = ({ text }: CategoryButtonProps) => {
  return (
    <button className="text-black border p-1 rounded-md w-12 cursor-pointer">
      {text}
    </button>
  );
};

const CategoryTable = () => {
  const { categories, isLoading, error } = useCategories(false);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorComponent message={error} />;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 ">
      <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
        <thead className="bg-gray-50">
          <tr>
            {tableHead?.map((tHead) => {
              return (
                <th
                  key={tHead.id}
                  className="px-4 py-2 font-medium text-gray-400 text-left uppercase"
                >
                  {tHead.name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {categories?.map((cat) => (
            <tr key={cat.id}>
              <td className="px-4 py-2 text-gray-700">{cat.displayOrder}</td>
              <td className="px-4 py-2 text-black font-bold">{cat.name}</td>
              <td className="px-4 py-2 text-gray-400 text-sm">{cat.slug}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    cat.active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {cat.active ? "Aktywna" : "Nieaktywna"}
                </span>
              </td>
              <td className="flex gap-2 justify-start px-4 py-2 ">
                <CategoryButton text="Ukryj" />
                <CategoryButton text="Edytuj" />
                <CategoryButton text="Usuń" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default CategoryTable;
