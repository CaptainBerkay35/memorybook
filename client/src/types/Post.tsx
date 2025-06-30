export type PostType = {
  _id: string;
  title: string;
  message: string;
  nickname: string;
  creator: string;
  tags: string[]; 
  selectedFile: string;
  likes: string[];
  createdAt?: string;
};
export type NewPostType = {
  title: string;
  message: string;
  tags: string[]; 
  selectedFile: string;
  nickname: string;
};


export type EditablePostFields = {
  title: string;
  message: string;
  tags: string[]; 
  selectedFile: string;
};
