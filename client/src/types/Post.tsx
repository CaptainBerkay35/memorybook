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
  profilePicture?: string;
  truncate:boolean;
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
