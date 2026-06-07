import { useState, useRef } from "react";
import { Expand, Plus, Trash2, Upload } from "lucide-react";
import ImageGalleryModal from "./ImageGalleryModal";
import DeleteModal from "../shared/DeleteModal";
import type { ListingImage } from "../../types/listingImage";
import noPicture from "../../assets/no-picture.png";

interface ImageGalleryProps {
  images: ListingImage[];
  isOwner: boolean;
  listingId: number;
  onUpload: (params: { listingId: number; file: File }) => void;
  onDelete: (params: { listingId: number; imageId: number }) => void;
  isUploading: boolean;
  isDeleting: boolean;
}

const ImageGallery = ({
  images,
  isOwner,
  listingId,
  onUpload,
  onDelete,
  isUploading,
  isDeleting,
}: ImageGalleryProps) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Bezpieczny index — nigdy poza zakresem
  const safeIdx = Math.min(selectedIdx, Math.max(0, images.length - 1));
  const selectedImage = images[safeIdx];
  const hasImages = images.length > 0;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onUpload({ listingId, file });
    e.target.value = "";
  };

  const handleDeleteConfirm = () => {
    if (imageToDelete === null) return;
    onDelete({ listingId, imageId: imageToDelete });
    // Cofnij index jeśli usuwamy ostatnie zdjęcie
    if (safeIdx >= images.length - 1) {
      setSelectedIdx(Math.max(0, images.length - 2));
    }
    setImageToDelete(null);
  };

  // Empty state
  if (!hasImages) {
    return (
      <div className="w-full">
        <div
          className="relative w-full aspect-video bg-gray-50 flex flex-col
          items-center justify-center gap-3 rounded-tl-2xl"
        >
          <img
            src={noPicture}
            alt="No photos"
            className="w-20 h-20 object-contain opacity-30"
          />
          <p className="text-sm text-gray-400">No photos yet</p>
          {isOwner && (
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700
                text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              <Plus size={16} />
              Add first photo
            </button>
          )}
        </div>
        {isOwner && (
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Main image */}
      <div
        className="relative w-full aspect-video bg-gray-100 overflow-hidden
          rounded-tl-2xl group cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={selectedImage?.url}
          alt={`Photo ${safeIdx + 1}`}
          className="w-full h-full object-cover transition-transform duration-300
            group-hover:scale-[1.02]"
        />

        {/* Delete button — top left, only owner */}
        {isOwner && selectedImage && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setImageToDelete(selectedImage.id);
            }}
            disabled={isDeleting || isUploading}
            className="absolute top-3 left-3 w-9 h-9 flex items-center justify-center
      bg-red-500/80 hover:bg-red-600 rounded-full shadow transition-all
      opacity-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 size={16} className="text-white" />
          </button>
        )}

        {/* Expand button — top right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center
            bg-white/90 hover:bg-white rounded-full shadow transition-all
            opacity-0 group-hover:opacity-100"
        >
          <Expand size={16} className="text-gray-700" />
        </button>

        {/* Counter */}
        {images.length > 1 && (
          <span
            className="absolute bottom-3 right-3 bg-black/55 text-white
            text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm"
          >
            {safeIdx + 1} / {images.length}
          </span>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex items-center gap-2 p-3 overflow-x-auto scrollbar-none">
        {images.map((img, i) => (
          <div
            key={img.id}
            onClick={() => setSelectedIdx(i)}
            className={`relative flex-shrink-0 w-[72px] h-[72px] rounded-lg
              overflow-hidden cursor-pointer border-2 transition-all
              ${
                safeIdx === i
                  ? "border-teal-500"
                  : "border-transparent hover:border-gray-300"
              }`}
          >
            <img
              src={img.url}
              alt={`Thumbnail ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Add thumbnail — only owner, max 5 */}
        {isOwner && images.length < 5 && (
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex-shrink-0 w-[72px] h-[72px] rounded-lg border-2 border-dashed
              border-gray-300 hover:border-teal-500 hover:bg-teal-50
              flex flex-col items-center justify-center gap-1
              text-gray-400 hover:text-teal-600 transition-all disabled:opacity-50"
          >
            <Plus size={20} />
            <span className="text-[10px] font-medium">Add</span>
          </button>
        )}
      </div>

      {isOwner && (
        <div
          className="flex items-center gap-3 px-3 pb-3 pt-2
          border-t border-gray-100"
        >
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading || isDeleting || images.length >= 5}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700
              text-white text-sm font-medium rounded-lg transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload size={15} />
            {isUploading
              ? "Uploading..."
              : isDeleting
                ? "Deleting..."
                : "Add photo"}
          </button>
          <span className="text-xs text-gray-400 ml-auto">
            {images.length}/5 · max 5MB
          </span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <ImageGalleryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={images}
        initialIndex={safeIdx}
      />

      <DeleteModal
        isOpen={imageToDelete !== null}
        onClose={() => setImageToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="this photo"
      />
    </div>
  );
};

export default ImageGallery;
