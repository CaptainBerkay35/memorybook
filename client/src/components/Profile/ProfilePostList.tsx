import { useState } from "react";
import Post from "../Posts/Post/Post";
import PostModal from "../Posts/Post/PostModal";
import type { PostType } from "../../types/Post";


export default function ProfilePostList({
  posts,
  emptyText,
}: {
  posts: PostType[];
  emptyText: string;
}) {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  if (!posts.length) {
    return <div className="text-center text-gray-500">{emptyText}</div>;
  }

  return (
    <>
      <div
        className="
          grid gap-4
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-3
        "
      >
        {posts.map((post) => (
          <Post 
            key={post._id} 
            post={post} 
            onPostClick={() => setSelectedPostId(post._id)} 
          />
        ))}
      </div>

      {selectedPostId && (
        <PostModal postId={selectedPostId} onClose={() => setSelectedPostId(null)} />
      )}
    </>
  );
}
