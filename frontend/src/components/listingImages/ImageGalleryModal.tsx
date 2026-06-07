import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { ListingImage } from "../../types/listingImage";

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: ListingImage[];
  initialIndex: number;
}

const ImageGalleryModal = ({
  isOpen,
  onClose,
  images,
  initialIndex,
}: ImageGalleryModalProps) => {
  const [currentIdx, setCurrentIdx] = useState(initialIndex);

  const prev = useCallback(
    () => setCurrentIdx((i) => (i > 0 ? i - 1 : images.length - 1)),
    [images.length],
  );
  const next = useCallback(
    () => setCurrentIdx((i) => (i < images.length - 1 ? i + 1 : 0)),
    [images.length],
  );

  useEffect(() => {
    if (!isOpen) return;

    const frame = window.requestAnimationFrame(() => {
      setCurrentIdx(initialIndex);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, prev, next]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center
          rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <X size={20} />
      </button>

      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10
            flex items-center justify-center rounded-full
            bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      <img
        src={images[currentIdx]?.url}
        alt={`Photo ${currentIdx + 1}`}
        className="max-w-[90vw] max-h-[85vh] rounded-xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10
            flex items-center justify-center rounded-full
            bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {images.length > 1 && (
        <span
          className="absolute bottom-5 left-1/2 -translate-x-1/2
          text-white/70 text-sm"
        >
          {currentIdx + 1} / {images.length}
        </span>
      )}
    </div>,
    document.body,
  );
};
export default ImageGalleryModal;
