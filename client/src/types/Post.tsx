export type PostType = {
  _id: string;
  title: string;
  message: string;
  creator: string;
  tags: string;
  selectedFile: string;
  likeCount?: number;
  createdAt?: string;
};
export type NewPostType = {
  title: string;
  message: string;
  creator: string;
  tags: string;
  selectedFile: string;
};

export type EditablePostFields = {
  title: string;
  message: string;
  tags: string;
  selectedFile: string;
};
