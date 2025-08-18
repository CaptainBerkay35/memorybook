import type { PostType } from "../types/Post";

type PostsState = {
  all: PostType[];
  userPosts: PostType[];
  likedPosts: PostType[];
  filteredByTag: PostType[];
  filteredByInterests: PostType[];
  recentPosts: PostType[];
  lastPostCreatedAt: number | null;
  isLoading: boolean;
  hasMoreInterestPosts: boolean;
  hasMoreTagPosts: boolean;
};

const initialState: PostsState = {
  all: [],
  userPosts: [],
  likedPosts: [],
  filteredByTag: [],
  filteredByInterests: [],
  recentPosts: [],
  lastPostCreatedAt: null,
  isLoading: false,
  hasMoreInterestPosts: true,
  hasMoreTagPosts: true,
};

export default (state = initialState, action: any): PostsState => {
  switch (action.type) {
    case "FETCH_ALL":
      return { ...state, all: action.payload };
    case "FETCH_POSTS_START":
      return { ...state, isLoading: true };
    case "FETCH_RECENT":
      return { ...state, recentPosts: action.payload, isLoading: false };
    case "FETCH_POSTS_END":
      return { ...state, isLoading: false };

    case "FETCH_USER_POSTS_START":
      return { ...state, isLoading: true };

    case "FETCH_USER_POSTS":
      return { ...state, userPosts: action.payload, isLoading: false };

    case "FETCH_USER_POSTS_ERROR":
      return { ...state, isLoading: false };

    case "FETCH_LIKED_POSTS":
      return { ...state, likedPosts: action.payload };
    case "FETCH_INTEREST_POSTS_START":
      return { ...state, isLoading: true };
    case "FETCH_INTEREST_POSTS":
      return {
        ...state,
        filteredByInterests: action.payload.posts,
        hasMoreInterestPosts: action.payload.hasMore,
        isLoading: false,
      };

    case "APPEND_INTEREST_POSTS":
      return {
        ...state,
        filteredByInterests: [
          ...state.filteredByInterests,
          ...action.payload.posts,
        ],
        hasMoreInterestPosts: action.payload.hasMore,
        isLoading: false,
      };
    case "ADD_TO_INTEREST_POSTS":
      return {
        ...state,
        filteredByInterests: [action.payload, ...state.filteredByInterests],
      };
    case "UPDATE_INTEREST_POST":
      return {
        ...state,
        filteredByInterests: state.filteredByInterests.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case "DELETE_INTEREST_POST":
      return {
        ...state,
        filteredByInterests: state.filteredByInterests.filter(
          (post) => post._id !== action.payload
        ),
      };
    case "FETCH_BY_TAG_START":
      return { ...state, isLoading: true };

    case "FETCH_BY_TAG":
      return {
        ...state,
        filteredByTag: action.payload.posts,
        hasMoreTagPosts: action.payload.hasMore,
        isLoading: false,
      };

    case "APPEND_BY_TAG":
      return {
        ...state,
        filteredByTag: [...state.filteredByTag, ...action.payload.posts],
        hasMoreTagPosts: action.payload.hasMore,
        isLoading: false,
      };

    case "FETCH_BY_TAG_ERROR":
      return { ...state, isLoading: false };

    case "RESET_FILTERED_BY_TAG":
      return { ...state, filteredByTag: [], hasMoreTagPosts: true };

    case "CREATE":
      return {
        ...state,
        lastPostCreatedAt: Date.now(),
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
    case "ADD_USER_POST":
      return {
        ...state,
        userPosts: [action.payload, ...state.userPosts],
      };

    case "RESET_USER_POSTS":
      return { ...state, userPosts: [] };

    case "RESET_LIKED_POSTS":
      return { ...state, likedPosts: [] };

    default:
      return state;
  }
};
