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
              <ProfileIconEmpty />
              <p className="text-base text-gray-500 ">Created by {post.name}</p>
            </div>
            <div>
              {user &&
                (user.result?._id === post.creator ||
                  user._id === post.creator) && (
                  <button
                    onClick={() => setShowDropdown((prev) => !prev)}
                    className="focus:outline-none"
                  >
                    <DropDownIcon />
                  </button>
                )}
              {showDropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute w-40 bg-white border  rounded-md shadow-lg z-10"
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
                      className="px-4 py-2  cursor-pointer flex items-center gap-2 bg-red-300 hover:bg-red-200"
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
              <div className="flex items-center gap-2">
                {user ? (
                  <button onClick={() => dispatch(likePost(post._id))}>
                    <LikeIcon color={hasLikedPost ? "#2563eb" : "#9ca3af"} />
                  </button>
                ) : (
                  <div>
                    <LikeIcon color="#999999" />
                  </div>
                )}

                <p className="text-sm text-gray-500 ">
                  Likes: {post.likes.length}
                </p>
              </div>
              <p className="text-sm text-gray-500 ">Tags: {post.tags}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
