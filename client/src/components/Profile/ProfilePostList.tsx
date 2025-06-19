import Post from "../Posts/Post/Post";
import type { PostType } from "../../types/Post";

export default function ProfilePostList({
  posts,
  emptyText,
}: {
  posts: PostType[];
  emptyText: string;
}) {
  if (!posts.length) {
    return <div className="text-center text-gray-500">{emptyText}</div>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}
