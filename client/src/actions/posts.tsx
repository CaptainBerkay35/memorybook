import * as api from "../api";
import type { Dispatch } from "redux";
import type { NewPostType, EditablePostFields } from "../types/Post";
import type { ThunkDispatch } from "redux-thunk";
import type { RootState } from "../store/store";


export const getPosts = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.error(error);
  }
};
export const getRecentPosts = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.fetchRecentPosts();
    dispatch({ type: "FETCH_RECENT", payload: data });
  } catch (error) {
    console.error(error);
  }
}
export const createPost = (post: NewPostType) =>
  async (dispatch: ThunkDispatch<RootState, void, any>, getState: () => RootState) => {
    try {
      const { data } = await api.createPost(post);
      dispatch({ type: "CREATE", payload: data });

      const user = getState().user?.result;
      const userInterests = user?.interests || [];

      const matchesInterest = data.tags.some((tag: string) =>
        userInterests.includes(tag)
      );

      if (matchesInterest) {
        dispatch({ type: "ADD_TO_INTEREST_POSTS", payload: data });
      }
    } catch (error) {
      console.error(error);
    }
  };

export const updatePost =
  (id: string, postData: EditablePostFields) =>
  async (dispatch: ThunkDispatch<RootState, void, any>, getState: () => RootState) => {
    try {
      const { data } = await api.updatePost(id, postData);
      dispatch({ type: "UPDATE", payload: data });

      const state = getState();
      const userInterests = state.user?.result?.interests || [];

      const matchesInterest = data.tags?.some((tag: string) =>
        userInterests.includes(tag)
      );

      if (matchesInterest) {
        dispatch({ type: "UPDATE_INTEREST_POST", payload: data });
      } else {
        // Eğer post artık ilgi alanına uymuyorsa, listeden çıkar
        dispatch({ type: "DELETE_INTEREST_POST", payload: id });
      }
    } catch (error) {
      console.error("Update post error:", error);
    }
  };

export const deletePost =
  (id: string) => async (dispatch: ThunkDispatch<RootState, void, any>, getState: () => RootState) => {
    try {
      await api.deletePost(id);
      dispatch({ type: "DELETE", payload: id });

      const state = getState();
      const userInterests = state.user?.result?.interests || [];

      const deletedPost = state.posts.filteredByInterests.find((post) => post._id === id);
      const matchesInterest = deletedPost?.tags?.some((tag) => userInterests.includes(tag));

      if (matchesInterest) {
        dispatch({ type: "DELETE_INTEREST_POST", payload: id });
      }
    } catch (error) {
      console.error("Delete post error:", error);
    }
  };

export const likePost =
  (id: string) => async (dispatch: ThunkDispatch<RootState, void, any>, getState: () => RootState) => {
    try {
      const { data } = await api.likePost(id);
      dispatch({ type: "UPDATE", payload: data });

      const state = getState();
      const userId = state.user?.result?._id;

      // İlgi alanına göre gelen listede varsa güncelle
      const userInterests = state.user?.result?.interests || [];
      const matchesInterest = data.tags.some((tag: string) =>
        userInterests.includes(tag)
      );

      if (matchesInterest) {
        dispatch({ type: "UPDATE_INTEREST_POST", payload: data });
      }

      if (userId) {
        dispatch(getLikedPosts(userId));
      }
    } catch (error) {
      console.error("Like post error:", error);
    }
  };

export const getPostsByUser = (userId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: "FETCH_USER_POSTS_START" });
    const { data } = await api.fetchPostsByUser(userId);
    dispatch({ type: "FETCH_USER_POSTS", payload: data });
  } catch (error) {
    console.error("User posts fetch error:", error);
    dispatch({ type: "FETCH_USER_POSTS_ERROR" });
  }
};
export const getLikedPosts = (userId: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.fetchLikedPosts(userId);
    dispatch({ type: "FETCH_LIKED_POSTS", payload: data });
  } catch (error) {
    console.error("Liked posts fetch error:", error);
  }
};
export const getPostsByTag = (tag: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.fetchPostsByTag(tag);
    dispatch({ type: "FETCH_BY_TAG", payload: data }); // ✅ Doğru action type
  } catch (error) {
    console.error("Error fetching posts by tag:", error);
  }
};
export const getPostsByUserInterests = (userId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: "FETCH_INTEREST_POSTS_START" });

    const { data } = await api.fetchPostsByUserInterests(userId);

    dispatch({ type: "FETCH_INTEREST_POSTS", payload: data });
  } catch (error) {
    console.error("Interest-based posts fetch error:", error);
  }
};

