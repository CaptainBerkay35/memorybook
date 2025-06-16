import { useState, useRef, useEffect } from "react";
import type { PostType } from "../../../types/Post";
import { useDispatch, useSelector } from "react-redux";
import { updatePost, deletePost, likePost } from "../../../actions/posts";
import type { AppDispatch, RootState } from "../../../store/store.tsx";
import EditPostForm from "../../Form/EditPostForm.tsx";
import {
  DeleteIcon,
  EditIcon,
  LikeIcon,
  DropDownIcon,
  ProfileIconEmpty,
} from "../../../assets/icons.tsx";

type PostProps = {
  post: PostType;
};

export default function Post({ post }: PostProps) {
  const dispatch: AppDispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.user);
  const hasLikedPost =
    user && post.likes.includes(user.result?._id || user._id);

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
    <div className="bg-white rounded-lg mb-6 p-4 md:p-6">
      {editMode ? (
        <EditPostForm
          formData={formData}
          setFormData={setFormData}
          onSave={handleSave}
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ProfileIconEmpty />
              <p className="text-sm md:text-base text-gray-500">{post.name}</p>
            </div>
            {user &&
              (user.result?._id === post.creator ||
                user._id === post.creator) && (
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="focus:outline-none"
                  >
                    <DropDownIcon />
                  </button>
                  {showDropdown && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10"
                    >
                      <ul className="text-sm text-gray-700">
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                          onClick={() => {
                            setEditMode(true);
                            setShowDropdown(false);
                          }}
                        >
                          <EditIcon />
                          Edit
                        </li>
                        <li
                          className="px-4 py-2 cursor-pointer flex items-center gap-2 bg-red-300 hover:bg-red-200"
                          onClick={() => {
                            const confirmDelete = window.confirm(
                              "Are you sure you want to delete this post?"
                            );
                            if (confirmDelete) {
                              dispatch(deletePost(post._id));
                              setShowDropdown(false);
                            }
                          }}
                        >
                          <DeleteIcon />
                          Delete
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
          </div>

          {/* Image Section */}
          <div className="relative rounded-lg overflow-hidden mb-4 aspect-[16/9] border border-gray-300">
            <img
              src={post.selectedFile}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            {post.tags && (
              <div className="absolute top-2 left-2">
                <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                  #{post.tags}
                </span>
              </div>
            )}
            <div className="absolute top-2 right-2 flex items-center gap-1">
              <button
                onClick={() => dispatch(likePost(post._id))}
                className="bg-white rounded-full p-1 md:p-2 shadow-md hover:bg-gray-100 transition-colors flex items-center gap-1"
              >
                <LikeIcon
                  filled={hasLikedPost}
                  onClick={() => dispatch(likePost(post._id))}
                />
                <p className="text-sm md:text-base text-gray-600">
                  {post.likes.length}
                </p>
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div className="flex-1">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 break-words">
                {post.title}
              </h2>
              <p className="text-sm md:text-base text-gray-600 mt-2 break-words whitespace-pre-line">
                {post.message}
              </p>
            </div>
          </div>
        </>
      )}
      <hr className="mt-6 border-t border-gray-200" />
    </div>
  );
}
