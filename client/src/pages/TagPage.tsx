import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByTag } from "../actions/posts";
import type { AppDispatch, RootState } from "../store/store";
import Post from "../components/Posts/Post/Post";
import MainLayout from "../layout/MainLayout";
import PostModal from "../components/Posts/Post/PostModal";

export default function TagPage() {
  const { tag } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.filteredByTag);
  const lastPostCreatedAt = useSelector(
    (state: RootState) => state.posts.lastPostCreatedAt
  );

  const [isLoading, setIsLoading] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useEffect(() => {
    if (tag) {
      setIsLoading(true);
      dispatch({ type: "RESET_FILTERED_BY_TAG" });
      dispatch(getPostsByTag(tag)).finally(() => setIsLoading(false));
    }
  }, [dispatch, tag, lastPostCreatedAt]);

  return (
    <MainLayout>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">{tag} tagged Posts</h2>

        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-500">No posts found with this tag.</p>
        ) : (
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
        )}
      </div>

      {selectedPostId && (
        <PostModal
          postId={selectedPostId}
          onClose={() => setSelectedPostId(null)}
        />
      )}
    </MainLayout>
  );
}
