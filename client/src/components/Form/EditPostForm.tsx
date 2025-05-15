import type { EditablePostFields } from "../../types/Post";
import React from "react";

type EditPostFormProps = {
  formData: EditablePostFields;
  setFormData: React.Dispatch<React.SetStateAction<EditablePostFields>>;
  onSave: () => void;
  onCancel: () => void;
};

export default function EditPostForm({
  formData,
  setFormData,
  onSave,
  onCancel,
}: EditPostFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({ ...formData, selectedFile: reader.result as string });
      };
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md space-y-3">
      <label className="block">
        <span className="block text-sm font-medium text-gray-700 mb-1">
          Edit Title
        </span>

        <input
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        />
      </label>
      <label className="block">
        <span className="block text-sm font-medium text-gray-700 mb-1">
          Edit Message
        </span>

        <textarea
          name="message"
          value={formData.message || ""}
          onChange={handleChange}
          placeholder="Message"
          rows={5}
          className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 resize-none"
        />
      </label>
      <label className="block">
        <span className="block text-sm font-medium text-gray-700 mb-1">
          Edit Tags
        </span>

        <input
          name="tags"
          value={formData.tags || ""}
          onChange={handleChange}
          placeholder="Tags (comma separated)"
          className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        />
      </label>
      <label className="block">
        <span className="block text-sm font-medium text-gray-700 mb-1">
          Upload Image
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
            file:rounded-xl file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100 transition duration-200"
        />
      </label>
      <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
        <button
          onClick={onSave}
          className="bg-green-500 text-white px-6 py-2 rounded-xl shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="text-gray-600 underline hover:text-gray-800 focus:outline-none transition duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
