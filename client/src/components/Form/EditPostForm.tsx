import { useEffect, useRef, useState } from "react";
import { CloseIcon } from "../../assets/icons";
import TagsMultiSelect from "../Form/TagMultiSelect";
import ImageUpload from "../ImageInput/ImageUpload";
import ToastSuccess from "../Toast/ToastSuccess"; // <- toast import et
import type { EditablePostFields } from "../../types/Post";

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  onSave: () => void;
  formData: EditablePostFields;
  setFormData: React.Dispatch<React.SetStateAction<EditablePostFields>>;
};

export default function EditPostForm({
  isOpen,
  onCancel,
  onSave,
  formData,
  setFormData,
}: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [showToast, setShowToast] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [formData.message]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onCancel();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onCancel]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(); // veriyi kaydet
    setShowToast(true); // toast göster
  };

  const handleToastClose = () => {
    setShowToast(false); // toast gizle
    onCancel(); // modalı kapat
  };

  if (!isOpen) return null;

  return (
    <>
      {showToast && (
        <ToastSuccess
          message="Post updated successfully!"
          duration={5000}
          onClose={handleToastClose}
        />
      )}

      <div className="fixed inset-0 z-[9999] bg-black bg-opacity-40 flex items-center justify-center p-4">
        <div
          ref={modalRef}
          className="bg-white w-full max-w-md rounded-md shadow-lg relative"
        >
          <button
            onClick={onCancel}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold z-50"
          >
            <CloseIcon />
          </button>

          <div className="flex items-center justify-center bg-black text-white text-lg text-center p-2 rounded-t-md">
            <h2 className="text-lg font-bold text-center">Edit Post</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-4">
            {/* Title */}
            <div className="mb-2">
              <label className="text-xs text-gray-800">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
                className="block w-full bg-gray-200 text-sm px-2 py-1 border border-gray-400 rounded-md"
              />
            </div>

            {/* Message */}
            <div className="mb-2">
              <label className="text-xs text-gray-800">Message</label>
              <textarea
                ref={textareaRef}
                name="message"
                value={formData.message || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData((prev) => ({ ...prev, message: value }));

                  // Auto resize during typing
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                rows={1}
                className="block w-full bg-gray-200 text-sm px-2 py-1 border border-gray-400 rounded-md resize-none overflow-hidden"
                placeholder="Write your message..."
              />
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <ImageUpload
                value={formData.selectedFile || ""}
                onChange={(base64) =>
                  setFormData({ ...formData, selectedFile: base64 })
                }
              />
            </div>

            {/* Tags */}
            <div className="mb-2">
              <div className="flex gap-2 items-center mb-1">
                <label className="text-xs text-gray-800">Tags</label>
                <span
                  className="text-xs text-gray-600 underline cursor-help"
                  title="You must select at least 1 tag and at most 3 tags."
                >
                  Tags selection rules
                </span>
              </div>
              <TagsMultiSelect
                selectedTags={formData.tags || []}
                onChange={(tags) => setFormData({ ...formData, tags })}
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={
                !formData.tags ||
                formData.tags.length < 1 ||
                formData.tags.length > 3
              }
              className={`p-2 border border-gray-400 rounded-md w-full ${
                !formData.tags ||
                formData.tags.length < 1 ||
                formData.tags.length > 3
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
