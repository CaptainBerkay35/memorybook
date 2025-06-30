import type { PostType } from "../types/Post";

type PostsState = {
  all: PostType[];
  userPosts: PostType[];
  likedPosts: PostType[];
  filteredByTag: PostType[];
  lastPostCreatedAt: number | null; 
};

const initialState: PostsState = {
  all: [],
  userPosts: [],
  likedPosts: [],
  filteredByTag: [],
   lastPostCreatedAt: null,
};

export default (state = initialState, action: any): PostsState => {
  switch (action.type) {
    case "FETCH_ALL":
      return { ...state, all: action.payload };

    case "FETCH_USER_POSTS":
      return { ...state, userPosts: action.payload };

    case "FETCH_LIKED_POSTS":
      return { ...state, likedPosts: action.payload };

    case "FETCH_BY_TAG":
      return { ...state, filteredByTag: action.payload }; // ✅ eklendi

    case "CREATE":
      return {
        ...state,
        all: [...state.all, action.payload],
        lastPostCreatedAt: Date.now(),  // Yeni post yaratıldı zaman damgası
      };
    case "UPDATE":
    case "LIKE":
      return {
        ...state,
        all: state.all.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        userPosts: state.userPosts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        likedPosts: state.likedPosts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        filteredByTag: state.filteredByTag.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ), 
      };

    case "DELETE":
      return {
        ...state,
        all: state.all.filter((post) => post._id !== action.payload),
        userPosts: state.userPosts.filter(
          (post) => post._id !== action.payload
        ),
        likedPosts: state.likedPosts.filter(
          (post) => post._id !== action.payload
        ),
        filteredByTag: state.filteredByTag.filter(
          (post) => post._id !== action.payload
        ),
      };

    case "RESET_USER_POSTS":
      return { ...state, userPosts: [] };

    case "RESET_LIKED_POSTS":
      return { ...state, likedPosts: [] };

    case "RESET_FILTERED_BY_TAG":
      return { ...state, filteredByTag: [] };

    default:
      return state;
  }
};
