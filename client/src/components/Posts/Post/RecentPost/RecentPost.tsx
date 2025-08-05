// components/RecentPosts/RecentPosts.tsx

import { useEffect, useState } from "react";
import Post from "../Post.tsx";
import LoadingSpinner from "../../../Loading/LoadingSpinner.tsx";
import * as api from "../../../../api";
import type { PostType } from "../../../../types/Post.tsx";

export default function RecentPosts() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const { data } = await api.fetchRecentPosts();
        setPosts(data);
      } catch (error) {
        console.error("Recent posts fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className=" gap-6 mt-6">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}
