import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Post from "./Post/Post.tsx";
import { getPosts } from "../../actions/posts";
import type { PostType } from "../../types/Post.tsx";
import type { AppDispatch, RootState } from "../../store/store";

type PostsProps = {
  posts?: PostType[];
};

export default function Posts({ posts }: PostsProps) {
  const dispatch: AppDispatch = useDispatch();
  const reduxPosts = useSelector((state: RootState) => state.posts.all);

  const displayPosts = posts ?? reduxPosts;

  useEffect(() => {
    if (!posts) {
      dispatch(getPosts());
    }
  }, [dispatch, posts]);

  return (
    <>
      {!displayPosts.length ? (
        <div>No posts yet.</div>
      ) : (
        <div>
          {displayPosts.map((post: PostType) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
