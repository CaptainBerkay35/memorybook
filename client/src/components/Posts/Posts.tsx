import Post from "./Post/Post.tsx";
import type { PostType } from "../../types/Post.tsx";
import LoadingSpinner from "../Loading/LoadingSpinner.tsx";

type PostsProps = {
  posts?: PostType[];
  isLoading?: boolean;
};

export default function Posts({ posts, isLoading }: PostsProps) {
  const displayPosts = posts ?? [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      {displayPosts.map((post: PostType) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}
