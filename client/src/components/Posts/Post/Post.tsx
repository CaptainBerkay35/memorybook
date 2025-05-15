import { useState, useRef, useEffect } from "react";
import type { PostType } from "../../../types/Post";
import { useDispatch } from "react-redux";
import { updatePost } from "../../../actions/posts";
import type { AppDispatch } from "../../../store/store.tsx";
import EditPostForm from "../../Form/EditPostForm.tsx";

type PostProps = {
  post: PostType;
};

export default function Post({ post }: PostProps) {
  const dispatch: AppDispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const [formData, setFormData] = useState({
    title: post.title,
    message: post.message,
    tags: post.tags,
    selectedFile: post.selectedFile,
  });

  const handleSave = () => {
    dispatch(updatePost(post._id, formData));
    setEditMode(false);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg border border-gray-300 mb-6">
      {editMode ? (
        <>
          <EditPostForm
            formData={formData}
            setFormData={setFormData}
            onSave={handleSave}
            onCancel={() => setEditMode(false)}
          />
        </>
      ) : (
        <>
          <div className=" flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#000"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88a9.95 9.95 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20"
                />
              </svg>
              <p className="text-base text-gray-500 ">
                Created by {post.creator}
              </p>
            </div>
            <div>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#000"
                    d="M6 14q-.825 0-1.412-.587T4 12t.588-1.412T6 10t1.413.588T8 12t-.587 1.413T6 14m6 0q-.825 0-1.412-.587T10 12t.588-1.412T12 10t1.413.588T14 12t-.587 1.413T12 14m6 0q-.825 0-1.412-.587T16 12t.588-1.412T18 10t1.413.588T20 12t-.587 1.413T18 14"
                  />
                </svg>
              </button>
              {/* Dropdown Menü */}
              {showDropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                >
                  <ul className="text-sm text-gray-700">
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                      onClick={() => {
                        setEditMode(true);
                        setShowDropdown(false);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#000"
                          d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1q-.15.15-.15.36M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"
                        />
                      </svg>
                      Edit
                    </li>
                    <li
                      className="px-4 py-2  cursor-pointer flex items-center gap-2 bg-red-300 hover:bg-red-200"
                      onClick={() => {
                        alert("Delete action here");
                        setShowDropdown(false);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#000"
                          d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
                        />
                      </svg>
                      Delete
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div>
            <div>
              <img
                src={post.selectedFile}
                alt={post.title}
                className="w-full h-96 object-cover mb-4 rounded-lg shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold text-gray-800">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-2">{post.message}</p>
            </div>
            <div className="flex flex-col justify-end items-end">
              <p className="text-sm text-gray-500 ">Likes: {post.likeCount}</p>
              <p className="text-sm text-gray-500 ">Tags: {post.tags}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
