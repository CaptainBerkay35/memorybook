import { useState } from "react";
import ToastSuccess from "../Toast/ToastSuccess.tsx";
type ConfirmModalProps = {
  text: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  toastMessage?: string; // opsiyonel toast mesajı
};

export default function ConfirmModal({
  text,
  isOpen,
  onConfirm,
  onCancel,
  toastMessage,
}: ConfirmModalProps) {
  const [showToast, setShowToast] = useState(false);

  if (!isOpen && !showToast) return null;

  const handleConfirm = () => {
    onConfirm();
    if (toastMessage) {
      setShowToast(true);
    } else {
      onCancel();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onCancel}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-gray-800 text-center">{text}</p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <ToastSuccess
          message={toastMessage!}
          onClose={() => {
            setShowToast(false);
            onCancel(); // toast kapandıktan sonra modalı kapat
          }}
        />
      )}
    </>
  );
}
