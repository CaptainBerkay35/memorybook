type PostType = {
  _id: string;
  creator: string;
  title: string;
  message: string;
  tags: string;
  selectedFile: string;
  createdAt: string;
  likeCount: number;
};

type PostProps = {
  post: PostType; // `post` tek bir nesne olmalı
};

export default function Post({ post }: PostProps) {
  return (
    <div className="p-4 bg-slate-400 border-black">
      <h2>{post.title}</h2>
      <p>{post.message}</p>
      <p>{post.creator}</p>
      <p>{post.tags}</p>
      <img src={post.selectedFile} alt={post.title} />
      <p>Likes: {post.likeCount}</p>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#751a1a" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"/></svg>
    </div>
  );
}
