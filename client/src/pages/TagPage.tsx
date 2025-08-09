import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { getPostsByTag } from "../actions/posts";
import type { AppDispatch, RootState } from "../store/store";
import Post from "../components/Posts/Post/Post";
import MainLayout from "../layout/MainLayout";
import LoadingSpinner from "../components/Loading/LoadingSpinner";
import PostModal from "../components/Posts/Post/PostModal";

export default function TagPage() {
  const { tag } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.filteredByTag);
  const hasMore = useSelector((state: RootState) => state.posts.hasMoreTagPosts);

  const [page, setPage] = useState(1);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useEffect(() => {
    if (tag) {
      setPage(1);
      dispatch({ type: "RESET_FILTERED_BY_TAG" });
      dispatch(getPostsByTag(tag, 1));
    }
  }, [tag, dispatch]);

  const fetchMoreData = () => {
    const nextPage = page + 1;
    dispatch(getPostsByTag(tag!, nextPage));
    setPage(nextPage);
  };

  return (
    <MainLayout>
      <div className="p-4 min-h-screen bg-white">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-700 mb-4">
          {tag} tagged Posts
        </h2>

        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center items-center my-4">
              <LoadingSpinner />
            </div>
          }
          scrollThreshold={0.9}
        >
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {posts.map((post) => (
              <Post
                key={post._id}
                post={post}
                onPostClick={() => setSelectedPostId(post._id)}
              />
            ))}
          </div>
        </InfiniteScroll>
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
