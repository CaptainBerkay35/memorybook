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
    state.posts.all.find((p) => p._id === postId)
  );

  if (!post) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <button
        onClick={onClose}
        className="fixed top-4 right-4 text-gray-200 hover:text-white text-2xl z-[60]"
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
