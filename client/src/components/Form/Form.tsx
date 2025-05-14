import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/posts";
import type { AppDispatch } from "../../store/store.tsx";

type PostData = {
  creator: string;
  title: string;
  message: string;
  tags: string;
  selectedFile: string;
};

export default function Form() {
  const [postData, setPostData] = useState<PostData>({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const dispatch: AppDispatch = useDispatch();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(postData); // Burada postData'yı API'ye gönderebilirsin
    dispatch(createPost(postData));
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
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
          <label className="text-xs text-gray-800">Creator</label>
          <input
            type="text"
            name="creator"
            value={postData.creator}
            onChange={(e) =>
              setPostData({ ...postData, creator: e.target.value })
            }
            className="block w-full bg-gray-200 text-sm px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:bg-gray-100 focus:border-gray-600"
          />
        </div>

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
