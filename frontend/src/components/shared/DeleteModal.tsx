import { createPortal } from "react-dom";

interface ConfirmDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
}: ConfirmDeleteProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
        <h3 className="text-lg font-bold text-gray-900">
          Are you absolutely sure?
        </h3>
        <p className="text-gray-500 mt-2">
          You are about to delete{" "}
          <span className="font-semibold text-gray-700">"{title}"</span>. This
          action cannot be undone.
        </p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default DeleteModal;
