import * as api from "../api";
import type { Dispatch } from "redux";
import type { NewPostType, EditablePostFields } from "../types/Post";

// Tüm postları getir
export const getPosts = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.error(error);
  }
};

// Yeni post oluştur
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

export const likePost = (id: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.error("Delete post error:", error);
  }
};
