import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Post from "./Post/Post.tsx";
import { getPosts } from "../../actions/posts";
import type { PostType } from "../../types/Post.tsx";
import type { AppDispatch, RootState } from "../../store/store";
import LoadingSpinner from "../Loading/LoadingSpinner.tsx";

type PostsProps = {
  posts?: PostType[];
  isLoading?: boolean;
};

export default function Posts({ posts, isLoading }: PostsProps) {
  const dispatch: AppDispatch = useDispatch();
  const reduxPosts = useSelector((state: RootState) => state.posts.all);

  const displayPosts = posts ?? reduxPosts;

  useEffect(() => {
    if (!posts) {
      dispatch(getPosts());
    }
  }, [dispatch, posts]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <>
      <div>
        {displayPosts.map((post: PostType) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </>
  );
}
