import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByTag } from "../actions/posts";
import type { AppDispatch, RootState } from "../store/store";
import Post from "../components/Posts/Post/Post";
import MainLayout from "../layout/MainLayout";
import PostModal from "../components/Posts/Post/PostModal";
import LoadingSpinner from "../components/Loading/LoadingSpinner";

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
      <div className="p-4 min-h-screen bg-white">
        <div className="min-h-[48px] ">
          {isLoading ? null : (
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-700">
              {tag} tagged Posts
            </h2>
          )}
        </div>

        {/* İçerik */}
        {isLoading ? (
           <div className="flex justify-center items-center h-[60vh]">
            <LoadingSpinner />
          </div>
        ) : posts.length === 0 ? (
          <p className="text-gray-500 text-center">
            No posts found with this tag.
          </p>
        ) : (
          <div
            className="
        grid gap-6
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
