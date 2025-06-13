import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/posts";
import type { AppDispatch } from "../../store/store.tsx";
import type { NewPostType } from "../../types/Post.tsx";

export default function Form() {
  const [postData, setPostData] = useState<NewPostType>({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
    name:"",
  });
  const dispatch: AppDispatch = useDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(postData);
    dispatch(createPost({...postData,name:user?.result?.name}));
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
      name:"",
    });
    setShowSuccess(true); 
    setTimeout(() => setShowSuccess(false), 3000);
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

  return (
    <div className="p-8">
      <form className="p-4 text-center" onSubmit={handleSubmit}>
        <h2 className="text-lg font-bold mb-4">Create Post</h2>

        <div className="text-left mb-2">
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

        <div className="text-left mb-2">
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

        <div className="text-left mb-2">
          <label className="text-xs text-gray-800">Tags</label>
          <input
            type="text"
            name="tags"
            value={postData.tags}
            onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
            className="block w-full bg-gray-200 text-sm px-2 py-1 border border-gray-400 rounded-md"
          />
        </div>

        <div className="text-left mb-4">
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
          className="p-2 border border-gray-400 bg-gray-200 text-center rounded-md w-full hover:bg-gray-300"
        >
          Submit
        </button>
        {showSuccess && (
          <div className="mt-4 text-green-600 font-medium animate-fade-in">
            Post created successfully!
          </div>
        )}
      </form>
    </div>
  );
}
