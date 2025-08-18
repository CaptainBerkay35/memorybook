export type User = {
  _id: string;
  email: string;
  nickname: string;
  profilePicture?: string;
  interests?: string[];
  googleId?: string;
};

export type UserState = {
  result: User;
  token: string;
  _id: string;
};
