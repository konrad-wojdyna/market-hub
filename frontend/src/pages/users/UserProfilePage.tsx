import {
  Pencil,
  MapPin,
  Calendar,
  MessageSquareMore,
  Trash2,
  Check,
  X,
} from "lucide-react";
import {
  Navbar,
  ListingList,
  ErrorComponent,
  Loading,
  DeleteModal,
  FormField,
} from "../../components";
import { useUserProfileById } from "../../hooks/useUserProfileById";
import { useCreateOrUpdateUserProfile } from "../../hooks/useCreateOrUpdateUserProfile";
import { useDeleteUserProfile } from "../../hooks/useDeleteUserProfile";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useListings } from "../../hooks/useListings";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type UserProfileFormData,
  userProfileSchema,
} from "../../schemas/userProfileSchema";
import { formatDate } from "../../utils/formatDate";

const UserProfilePage = () => {
  const { id } = useParams();
  const idToNumber = Number(id);

  const { isLoading, error, data, refetch } = useUserProfileById(idToNumber);
  const { user } = useAuthContext();
  const { listings, isLoading: isListingsLoading } = useListings({
    ownerId: idToNumber,
  });
  const { createOrUpdateUserProfile, isLoading: isSaving } =
    useCreateOrUpdateUserProfile();
  const { handleDeleteAccount, isLoading: isDeleting } = useDeleteUserProfile();

  const isOwner = user?.id === idToNumber;

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
  });

  const handleEditOpen = () => {
    reset({
      avatarUrl: data?.avatarUrl ?? "",
      bio: data?.bio ?? "",
      city: data?.city ?? "",
    });
    setIsEditing(true);
  };

  const onSubmit = async (formData: UserProfileFormData) => {
    await createOrUpdateUserProfile(formData);
    await refetch();
    setIsEditing(false);
  };

  const initials =
    data?.firstName && data?.lastName
      ? `${data.firstName.charAt(0)}${data.lastName.charAt(0)}`
      : "?";

  if (error) return <ErrorComponent message={error?.message} />;

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {isLoading ? (
        <Loading />
      ) : (
        <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-5">
          <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="h-36 bg-linear-to-br from-teal-600 to-teal-700" />

            <div className="px-6 pb-6">
              <div className="flex items-end justify-between -mt-12 mb-5">
                <div
                  className="w-24 h-24 rounded-full border-4 border-white bg-teal-50
                  flex items-center justify-center shadow-md overflow-hidden shrink-0"
                >
                  {data?.avatarUrl ? (
                    <img
                      src={data.avatarUrl}
                      alt={`${data.firstName} ${data.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-teal-600">
                      {initials}
                    </span>
                  )}
                </div>

                <div className="flex gap-2 mb-1">
                  {isOwner && !isEditing && (
                    <button
                      onClick={handleEditOpen}
                      aria-label="Edytuj profil"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200
                        text-sm font-medium text-gray-600 hover:border-teal-500 hover:text-teal-600
                        hover:bg-teal-50 transition-all cursor-pointer"
                    >
                      <Pencil size={13} />
                      Edytuj profil
                    </button>
                  )}
                  {!isOwner && (
                    <button
                      aria-label="Napisz wiadomość do sprzedającego"
                      className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-teal-600
                        text-sm font-medium text-white hover:bg-teal-700 transition-all cursor-pointer"
                    >
                      <MessageSquareMore size={13} />
                      Napisz wiadomość
                    </button>
                  )}
                </div>
              </div>

              {!isEditing && (
                <section aria-label="Dane profilu">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {data?.firstName} {data?.lastName}
                  </h1>

                  <div className="flex flex-wrap gap-4 mb-4">
                    {data?.city && (
                      <span className="flex items-center gap-1.5 text-sm text-gray-500">
                        <MapPin
                          size={13}
                          className="text-teal-500"
                          aria-hidden="true"
                        />
                        {data.city}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5 text-sm text-gray-500">
                      <Calendar
                        size={13}
                        className="text-teal-500"
                        aria-hidden="true"
                      />
                      Członek od {formatDate(data?.joinedAt)}
                    </span>
                  </div>

                  {data?.bio ? (
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {data.bio}
                    </p>
                  ) : (
                    isOwner && (
                      <p className="text-gray-400 text-sm italic">
                        Dodaj opis, aby inni wiedzieli kim jesteś.
                      </p>
                    )
                  )}
                </section>
              )}

              {isEditing && (
                <section aria-label="Formularz edycji profilu">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    Edytuj profil
                  </h2>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="flex flex-col gap-4"
                  >
                    <FormField label="Miasto" name="city" errors={errors}>
                      <input
                        id="city"
                        type="text"
                        placeholder="np. Warszawa"
                        {...register("city")}
                        className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm
                          focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100
                          transition-all"
                      />
                    </FormField>

                    <FormField label="O mnie" name="bio" errors={errors}>
                      <textarea
                        id="bio"
                        placeholder="Napisz coś o sobie..."
                        rows={4}
                        {...register("bio")}
                        className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm resize-none
                          focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100
                          transition-all"
                      />
                    </FormField>

                    <FormField
                      label="URL zdjęcia profilowego"
                      name="avatarUrl"
                      errors={errors}
                    >
                      <input
                        id="avatarUrl"
                        type="url"
                        placeholder="https://..."
                        {...register("avatarUrl")}
                        className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm
                          focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100
                          transition-all"
                      />
                    </FormField>

                    <div className="flex gap-2 pt-1">
                      <button
                        type="submit"
                        disabled={isSaving}
                        aria-label="Zapisz zmiany profilu"
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-teal-600
                          text-sm font-medium text-white hover:bg-teal-700 disabled:opacity-50
                          transition-all cursor-pointer"
                      >
                        <Check size={14} aria-hidden="true" />
                        {isSaving ? "Zapisywanie..." : "Zapisz zmiany"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        aria-label="Anuluj edycję"
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-gray-200
                          text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all cursor-pointer"
                      >
                        <X size={14} aria-hidden="true" />
                        Anuluj
                      </button>
                    </div>
                  </form>
                </section>
              )}
            </div>
          </article>

          <section
            aria-label="Ogłoszenia użytkownika"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">Ogłoszenia</h2>
            {!isListingsLoading && listings?.content?.length === 0 ? (
              <p className="text-sm text-gray-400 italic">
                Brak aktywnych ogłoszeń.
              </p>
            ) : (
              <ListingList
                listings={listings?.content ?? []}
                isLoading={isListingsLoading}
              />
            )}
          </section>

          {isOwner && !isEditing && (
            <aside
              aria-label="Strefa niebezpieczna"
              className="bg-red-50 border border-red-100 rounded-2xl p-5"
            >
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="text-sm font-semibold text-red-600 mb-0.5">
                    Usuń profil
                  </h3>
                  <p className="text-xs text-red-400">
                    Ta operacja jest nieodwracalna. Twoje ogłoszenia pozostaną
                    aktywne.
                  </p>
                </div>
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  aria-label="Otwórz potwierdzenie usunięcia profilu"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-red-200
                    text-sm font-medium text-red-500 hover:bg-red-100 hover:border-red-300
                    transition-all cursor-pointer"
                >
                  <Trash2 size={13} aria-hidden="true" />
                  Usuń profil
                </button>
              </div>
            </aside>
          )}
        </div>
      )}

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={async () => {
          await handleDeleteAccount();
          setIsDeleteModalOpen(false);
        }}
        title="swój profil"
      />
    </main>
  );
};

export default UserProfilePage;
