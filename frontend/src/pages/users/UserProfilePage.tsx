import { Pencil, MapPin, Calendar, MessageSquareMore } from "lucide-react";
import { Navbar, ListingList, ErrorComponent, Loading } from "../../components";
import { useUserProfileById } from "../../hooks/useUserProfileById";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const UserProfile = () => {
  const { id } = useParams();
  const idToNumber = Number(id);
  const { isLoading, error, data } = useUserProfileById(idToNumber);
  const { user } = useAuthContext();

  const isOwner = user?.id === idToNumber;

  if (error) {
    return <ErrorComponent message={error?.message} />;
  }

  return (
    <section>
      <Navbar />

      {isLoading ? (
        <Loading />
      ) : (
        <div className="m-5  rounded-t-xl overflow-hidden min-h-150 bg-gray-100">
          <nav className="relative bg-[#0D9488] h-40">
            <div className="absolute top-25 left-5 h-25 flex items-center justify-center  border-6 border-white bg-gray-100 w-25 rounded-full ">
              <span className="text-4xl font-bold text-[#0D9488]">
                {data?.avatarUrl ||
                  `${data?.firstName.charAt(0)}${data?.lastName.charAt(0)}`}
              </span>
              <div
                className="absolute h-7 w-7 flex items-center justify-center
             bg-green-800 rounded-full bottom-0 right-0 border-4 
             border-white cursor-pointer"
              >
                <Pencil size={13} className="text-yellow-200" />
              </div>
            </div>
            {isOwner ? (
              <button
                className="absolute top-45 right-5 flex items-center justify-center gap-1
          border px-4  py-1 border-gray-400 rounded-xl cursor-pointer"
              >
                <Pencil size={12} className="text-yellow-600" />
                Edytuj profil
              </button>
            ) : (
              <button
                className="absolute top-45 right-5 flex items-center justify-center gap-1
          border px-4  py-1 border-gray-400 rounded-xl cursor-pointer bg-[#0D9488] text-white"
              >
                <MessageSquareMore size={12} className="text-white" />
                Napisz wiadomość
              </button>
            )}
          </nav>
          <header className="flex flex-col gap-1 mt-15 ml-5">
            <p className="text-2xl tracking-wider font-bold">
              {data?.firstName} {data?.lastName}
            </p>
            <div className="flex items-center gap-5">
              <span className="flex gap-1 items-center text-gray-600">
                <MapPin size={12} />
                {data?.city}
              </span>
              <span className="flex gap-1 items-center text-gray-600">
                <Calendar size={12} />
                Członek od {data?.joinedAt}
              </span>
            </div>
            <p className="text-md mt-4">{data?.bio}</p>
          </header>
          <div className="mt-5 ml-5">
            <p className="text-2xl ">Ogłoszenia</p>
            <ListingList isLoading={false} listings={[]} />
          </div>
        </div>
      )}
    </section>
  );
};
export default UserProfile;
