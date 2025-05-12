import Post from "./Post/Post.tsx";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store.tsx";

export default function Posts() {
  const posts = useSelector((state: RootState) => state.posts);
  console.log(posts);
  return (
    <div>
      <h1>POSTS</h1>
      <Post></Post>
      <Post></Post>
    </div>
  );
}
