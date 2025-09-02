import Post from "./Post"; 
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { CloseIcon } from "../../../assets/icons.tsx";

export default function PostModal({
  postId,
  onClose,
}: {
  postId: string;
  onClose: () => void;
}) {
  const post = useSelector((state: RootState) =>
  state.posts.filteredByTag.find((p) => p._id === postId) ||
  state.posts.userPosts.find((p) => p._id === postId) ||
  state.posts.likedPosts.find((p) => p._id === postId)
);
if (!post) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-black p-6 rounded-lg shadow-lg"
      >
        <p>Post could not be loaded.</p>
        <button onClick={onClose} className="mt-4 text-blue-500 underline">
          Close
        </button>
      </div>
    </div>
  );
}
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <button
        onClick={onClose}
        className="hidden md:block fixed top-4 right-4 text-gray-200 hover:text-white text-2xl z-[60]"
      >
        <CloseIcon />
      </button>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto relative"
      >
        <Post post={post} onClose={onClose} mb="mb-0" />
      </div>
    </div>
  );
}
