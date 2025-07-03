import * as api from "../api";
import type { Dispatch,AnyAction  } from "redux";
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

export const createPost = (post: NewPostType) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const updatePost =
  (id: string, postData: EditablePostFields) => async (dispatch: Dispatch) => {
    try {
      const { data } = await api.updatePost(id, postData);
      dispatch({ type: "UPDATE", payload: data });
    } catch (error) {
      console.error("Update post error:", error);
    }
  };

export const deletePost = (id: string) => async (dispatch: Dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: "DELETE", payload: id }); // veya sadece id
  } catch (error) {
    console.error("Delete post error:", error);
  }
};

export const likePost =
  (id: string) => async (dispatch: ThunkDispatch<RootState, void, any>, getState: () => RootState) => {
    try {
      const { data } = await api.likePost(id);
      dispatch({ type: "UPDATE", payload: data });

      const userId = getState().user?.result?._id || getState().user?._id;
      if (userId) {
        dispatch(getLikedPosts(userId));
      }
    } catch (error) {
      console.error("Like post error:", error);
    }
  };
export const getPostsByUser = (userId: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.fetchPostsByUser(userId);
    dispatch({ type: "FETCH_USER_POSTS", payload: data });

  } catch (error) {
    console.error("User posts fetch error:", error);
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
