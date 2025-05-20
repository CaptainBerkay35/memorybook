import axios from "axios";
import type { EditablePostFields } from "../types/Post";

const url = 'http://localhost:5000/posts';

export const fetchPosts = async () => {
    const response = await axios.get(url);
    return response;
};

export const createPost = (newPost:any) => axios.post(url,newPost);

export const updatePost = (id: string, updatedPost: EditablePostFields) =>
  axios.patch(`${url}/${id}`, updatedPost);

export const deletePost = (id: string) => axios.delete(`${url}/${id}`);

export const likePost = (id:string) => axios.patch(`${url}/${id}/likePost`);
