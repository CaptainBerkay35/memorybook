import { useState, useRef, useEffect } from "react";
import type { PostType } from "../../../types/Post";
import { useDispatch, useSelector } from "react-redux";
import { updatePost, deletePost, likePost } from "../../../actions/posts";
import type { AppDispatch, RootState } from "../../../store/store.tsx";
import EditPostForm from "../../Form/EditPostForm.tsx";
import ConfirmModal from "../../ConfirmModal/ConfirmModal.tsx";
import {
  DeleteIcon,
  EditIcon,
  LikeIcon,
  DropDownIcon,
  ProfileIconEmpty,
} from "../../../assets/icons.tsx";
import { Link } from "react-router-dom";

type PostProps = {
  post: PostType;
  onPostClick?: () => void;
  onClose?: () => void;
  mb?: string;
  truncate?: boolean;
};

export default function Post({
  post,
  onPostClick,
  onClose,
  mb = "mb-6",
  truncate = false,
}: PostProps) {
  const dispatch: AppDispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.user);
  const hasLikedPost = user && post.likes.includes(user.result?._id);

  // Dropdown dışına tıklamada kapatma
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    if (showDropdown)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  const [formData, setFormData] = useState({
    title: post.title,
    message: post.message,
    tags: post.tags,
    selectedFile: post.selectedFile,
  });

  const handleSave = () => {
    dispatch(updatePost(post._id, formData));
  };

  function getTimeAgo(dateString: string) {
    const now = new Date();
    const createdAt = new Date(dateString);
    const diffMs = now.getTime() - createdAt.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return "just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  }

  return (
    <div
      className={`bg-white rounded-lg ${mb} p-4 md:p-6`}
      onClick={() => {
        if (onPostClick && !onClose) onPostClick();
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Link
          to={`/profile/${post.creator}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 hover:underline"
        >
          {post.profilePicture ? (
            <img
              src={post.profilePicture}
              alt={post.nickname}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <ProfileIconEmpty size={40} />
          )}
          <p className="text-sm md:text-base text-gray-500">{post.nickname}</p>
        </Link>

        {user && user.result?._id === post.creator && (
          <div
            className="relative max-h-[24px]"
            onClick={(e) => e.stopPropagation()}
          >
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
                    <EditIcon /> Edit
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer flex items-center gap-2 bg-red-300 hover:bg-red-200"
                    onClick={() => {
                      setShowDeleteModal(true);
                      setShowDropdown(false);
                    }}
                  >
                    <DeleteIcon /> Delete
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
        {post.tags && post.tags.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-2 max-w-[90%]">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`/tags/${tag}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onClose) onClose();
                }}
                className="bg-gray-600 bg-opacity-90 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md hover:bg-gray-700 transition-colors whitespace-nowrap"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        <div className="absolute top-2 right-2 flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(likePost(post._id));
            }}
            className="bg-white rounded-full p-1 md:p-2 shadow-md hover:bg-gray-100 transition-colors flex items-center gap-1"
          >
            <LikeIcon filled={!!hasLikedPost} />
            <p className="text-sm md:text-base text-gray-600">
              {post.likes.length}
            </p>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex-1">
          <div className="flex justify-between">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 break-words">
              {post.title}
            </h2>
            {post.createdAt && (
              <div className="text-xs text-gray-400">
                {getTimeAgo(post.createdAt)}
              </div>
            )}
          </div>
          <p
            className={`text-sm md:text-base text-gray-600 mt-2 break-words ${
              truncate ? "line-clamp-1" : ""
            } text-justify`}
          >
            {post.message}
          </p>
          {truncate && post.message.split("\n").length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onPostClick) onPostClick();
              }}
              className="text-blue-500 text-sm mt-1"
            >
              Expand more
            </button>
          )}
        </div>
      </div>

      {/* Edit Form */}
      {editMode && (
        <EditPostForm
          isOpen={editMode}
          formData={formData}
          setFormData={setFormData}
          onCancel={() => setEditMode(false)}
          onSave={handleSave}
        />
      )}

      <hr className="mt-6 border-t border-gray-200" />

      {/* Confirm Modal & Toast */}
      <ConfirmModal
        isOpen={showDeleteModal}
        text="Are you sure you want to delete this post?"
        toastMessage="Post deleted successfully!"
        onConfirm={() => {
          dispatch(deletePost(post._id));
        }}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
