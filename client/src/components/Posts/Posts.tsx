import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "../../actions/posts";
import type { RootState } from "../../store/store.tsx";
import Post from "./Post/Post.tsx";
import type { AppDispatch } from "../../store/store.tsx";
import type { PostType } from "../../types/Post.tsx";

export default function Posts() {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts) as PostType[];
  console.log("Postlar:", posts);

  useEffect(() => {
    dispatch(getPosts());  // Sayfa yüklendiğinde tüm postları çek
  }, [dispatch]);

  return (
    <>
      {!posts.length ? (
        <div>No posts yet.</div>
      ) : (
        <div>
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
