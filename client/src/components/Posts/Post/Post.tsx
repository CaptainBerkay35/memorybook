import { useState } from "react";
import type { PostType } from "../../../types/Post";
import { useDispatch } from "react-redux";
import { updatePost } from "../../../actions/posts";
import type { AppDispatch } from "../../../store/store.tsx";

type PostProps = {
  post: PostType;
};

export default function Post({ post }: PostProps) {
  const dispatch: AppDispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    title: post.title,
    message: post.message,
    tags: post.tags,
    selectedFile: post.selectedFile,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    dispatch(updatePost(post._id, formData));
    setEditMode(false);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg border border-gray-300 mb-6">
      {editMode ? (
        <>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="selectedFile"
            value={formData.selectedFile}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="text-gray-600 underline hover:text-gray-800 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {post.title}
          </h2>
          <p className="text-gray-600 mb-2">{post.message}</p>
          <p className="text-sm text-gray-500 mb-2">
            Created by {post.creator}
          </p>
          <p className="text-sm text-gray-500 mb-2">Tags: {post.tags}</p>
          <img
            src={post.selectedFile}
            alt={post.title}
            className="w-full h-96 object-cover mb-4 rounded-lg shadow-sm"
          />
          <p className="text-sm text-gray-500 mb-4">Likes: {post.likeCount}</p>

          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
}
