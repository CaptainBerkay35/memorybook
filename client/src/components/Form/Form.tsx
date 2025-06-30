import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/posts";
import type { AppDispatch } from "../../store/store.tsx";
import type { NewPostType } from "../../types/Post.tsx";
import { CloseIcon } from "../../assets/icons.tsx";
import TagsMultiSelect from "./TagMultiSelect.tsx";
type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Form({ isOpen, onClose }: Props) {
  const [postData, setPostData] = useState<NewPostType>({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
    nickname: "",
  });
  const dispatch: AppDispatch = useDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postData.tags.length < 1) {
      alert("Please select at least one tag.");
      return;
    }
    if (postData.tags.length > 3) {
      alert("You can select up to 3 tags only.");
      return;
    }
    dispatch(createPost({ ...postData, nickname: user?.result?.nickname }));
    setPostData({
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
      nickname: "",
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setTimeout(() => onClose(), 4000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPostData({ ...postData, selectedFile: reader.result as string });
      };
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-40 flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold z-50"
      >
        <CloseIcon></CloseIcon>
      </button>
      <div
        ref={modalRef}
        className="bg-white w-full max-w-md rounded-md shadow-lg relative"
      >
        <div className="flex items-center justify-center bg-black text-white text-lg text-center p-2">
          <h2 className="text-lg font-bold  text-center">Create Post</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-2">
            <label className="text-xs text-gray-800">Title</label>
            <input
              type="text"
              name="title"
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
              className="block w-full bg-gray-200 text-sm px-2 py-1 border border-gray-400 rounded-md"
            />
          </div>

          <div className="mb-2">
            <label className="text-xs text-gray-800">Message</label>
            <input
              type="text"
              name="message"
              value={postData.message}
              onChange={(e) =>
                setPostData({ ...postData, message: e.target.value })
              }
              className="block w-full bg-gray-200 text-sm px-2 py-1 border border-gray-400 rounded-md"
            />
          </div>
          <div className="mb-2">
            <div className="flex gap-2 items-center mb-1">
              <label className="text-xs text-gray-800">Tags</label>
              <span
                className="text-xs text-gray-600 underline cursor-help "
                title="You must select at least 1 tag and at most 3 tags."
              >
                Tags selection rules
              </span>
            </div>

            <TagsMultiSelect
              selectedTags={postData.tags}
              onChange={(tags) => setPostData({ ...postData, tags })}
            />
          </div>

          <div className="mb-4">
            <label className="text-xs text-gray-800">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block mt-1"
            />
          </div>

          <button
            type="submit"
            disabled={postData.tags.length < 1 || postData.tags.length > 3}
            className={`p-2 border border-gray-400 rounded-md w-full ${
              postData.tags.length < 1 || postData.tags.length > 3
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Submit
          </button>

          {showSuccess && (
            <div className="mt-4 text-green-600 font-medium text-center animate-fade-in">
              Post created successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
