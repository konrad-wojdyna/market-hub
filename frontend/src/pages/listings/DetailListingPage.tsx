import { Link, useParams, useNavigate } from "react-router-dom";
import { DeleteModal, Navbar, ImageGallery } from "../../components";
import { MapPin, TimerIcon } from "lucide-react";
import { useState } from "react";
import { useDeleteListing } from "../../hooks/useDeleteListing";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useListingDetail } from "../../hooks/useListingDetail";
import { useListingImages } from "../../hooks/useListingImages";

const DetailListingPage = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { id } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const { data, error, isLoading } = useListingDetail(Number(id));
  const {
    listingImages,
    uploadImageListing,
    deleteImageListing,
    isUploading,
    isDeleting,
  } = useListingImages(Number(id));

  const { handleDelete } = useDeleteListing();

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error?.message}</p>
      </div>
    );

  return (
    <section className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4 flex gap-2 text-sm">
        <Link
          to="/"
          className="text-gray-400 hover:text-teal-600 transition-colors"
        >
          Listings
        </Link>
        <span className="text-gray-300">/</span>
        <Link
          to="/"
          className="text-gray-400 hover:text-teal-600 transition-colors"
        >
          {data?.category}
        </Link>
        <span className="text-gray-300">/</span>
        <p className="text-gray-700 font-medium truncate max-w-xs">
          {data?.title}
        </p>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <article className="bg-white shadow-sm rounded-2xl overflow-hidden border border-gray-100">
          {/* Two column layout on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left — Gallery */}
            <div className="lg:border-r border-gray-100">
              <ImageGallery
                images={listingImages ?? []}
                isOwner={user?.id === data?.ownerId}
                listingId={Number(id)}
                onUpload={uploadImageListing}
                onDelete={deleteImageListing}
                isUploading={isUploading}
                isDeleting={isDeleting}
              />
            </div>

            {/* Right — Info */}
            <div className="flex flex-col gap-5 p-6">
              {/* Category badge */}
              <span
                className="text-xs font-semibold tracking-wider uppercase
                text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md w-fit border border-teal-100"
              >
                {data?.category}
              </span>

              {/* Title */}
              <h1 className="text-2xl font-bold text-gray-900 leading-snug">
                {data?.title}
              </h1>

              {/* Price */}
              <p className="text-3xl font-bold text-purple-700">
                {data?.price} PLN
              </p>

              {/* Meta */}
              <div className="flex flex-col gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400">Location</p>
                    <p className="text-sm font-medium text-gray-700">
                      {data?.location ?? "Not specified"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TimerIcon
                    size={18}
                    className="text-gray-400 flex-shrink-0"
                  />
                  <div>
                    <p className="text-xs text-gray-400">Posted</p>
                    <p className="text-sm font-medium text-gray-700">
                      {data?.createdAt}
                    </p>
                  </div>
                </div>
              </div>

              {/* Owner actions */}
              {user?.id === data?.ownerId && (
                <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
                  <Link
                    to={`/listings/${data?.id}/edit`}
                    className="flex-1 text-center px-4 py-2.5 rounded-lg
                      bg-teal-600 hover:bg-teal-700 text-white font-medium
                      transition-colors text-sm"
                  >
                    Edit Listing
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700
                      text-white font-medium transition-colors cursor-pointer text-sm"
                  >
                    Delete Listing
                  </button>
                </div>
              )}
              {user && user?.id !== data?.ownerId && (
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      if (!user) {
                        navigate("/login");
                        return;
                      }

                      navigate(
                        `/messages?listingId=${data?.id}&sellerId=${data?.ownerId}`,
                      );
                    }}
                    className="w-full px-4 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700
        text-white font-medium transition-colors cursor-pointer text-sm"
                  >
                    Napisz do sprzedającego
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Description — full width */}
          {data?.description && (
            <div className="p-6 border-t border-gray-100">
              <p className="text-base font-semibold text-gray-900 mb-3">
                Description
              </p>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {data.description}
              </p>
            </div>
          )}
        </article>
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={async () => {
          await handleDelete(Number(id));
          navigate("/listings");
        }}
        title={data?.title ?? ""}
      />
    </section>
  );
};

export default DetailListingPage;
