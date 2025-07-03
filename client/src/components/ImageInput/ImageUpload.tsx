// ImageUpload.tsx
import { useState, useEffect } from "react";

type ImageUploadProps = {
  value: string; // base64 ya da dosya url
  onChange: (fileBase64: string) => void;
};

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (!value) {
      setFileName("");
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);

      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

 return (
  <div className="mb-4">
    <label className="text-xs text-gray-800 block mb-1">Upload Image</label>

    <div className="flex items-center gap-4">
      <label
        htmlFor="file-upload"
        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v6m0 0l-3-3m3 3l3-3M16 7l-4-4m0 0L8 7m4-4v16"
          />
        </svg>
        Choose Image
      </label>

      {value && (
        <img
          src={value}
          alt="Selected"
          className="w-20 h-20 object-cover rounded border border-gray-300"
        />
      )}
    </div>

    <input
      id="file-upload"
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      className="hidden"
    />
  </div>
);

}
