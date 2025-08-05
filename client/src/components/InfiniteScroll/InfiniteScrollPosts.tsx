import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Post from "../Posts/Post/Post"; // her bir postu gösteren component
import { getPostsByUserInterests } from "../../actions/posts";
import type { RootState, AppDispatch } from "../../store/store";
import LoadingSpinner from "../Loading/LoadingSpinner";

export default function InfiniteScrollPosts() {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.filteredByInterests);
  const hasMore = useSelector((state: RootState) => state.posts.hasMoreInterestPosts);
  const user = useSelector((state: RootState) => state.user);
  const [page, setPage] = useState(1);

  const fetchMoreData = () => {
    const nextPage = page + 1;
    dispatch(getPostsByUserInterests(user!.result._id, nextPage));
    setPage(nextPage);
  };

  return (
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
    <div className="grid grid-cols-1 gap-4">
      {posts.map((post) => (
        <div key={post._id}>
          <Post post={post} />
        </div>
      ))}
    </div>
  </InfiniteScroll>
);
}
