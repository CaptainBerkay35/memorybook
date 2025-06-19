import axios from "axios";
import {jwtDecode} from "jwt-decode";
import type { EditablePostFields } from "../types/Post";
import type { AuthFormData } from "../types/Auth";
import type { NavigateFunction } from "react-router-dom";

// Navigation'ı hook dışında kullanmak için
let navigate: NavigateFunction;
export const injectNavigate = (nav: NavigateFunction) => {
  navigate = nav;
};

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  const userString = localStorage.getItem("user");

  if (userString && req.headers) {
    const user = JSON.parse(userString) as { token: string };
    req.headers.Authorization = `Bearer ${user.token}`;

    // Token süresi dolmuş mu kontrolü
    const decoded: { exp: number } = jwtDecode(user.token);
    if (decoded.exp * 1000 < new Date().getTime()) {
      localStorage.removeItem("user");
      if (navigate) {
        navigate("/auth");
      }
    }
  }

  return req;
});

export const fetchPosts = async () => {
  const response = await API.get("/posts");
  return response;
};

export const createPost = (newPost: any) => API.post("/posts", newPost);

export const updatePost = (id: string, updatedPost: EditablePostFields) =>
  API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id: string) => API.delete(`/posts/${id}`);

export const likePost = (id: string) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData: AuthFormData) =>
  API.post("/user/signin", formData);
export const signUp = (formData: AuthFormData) =>
  API.post("/user/signup", formData);
export const fetchPostsByUser = (userId: string) =>
  API.get(`/posts/user/${userId}`);
export const fetchLikedPosts = (userId: string) =>
  API.get(`/posts/liked/${userId}`);
export const fetchUserById = (userId: string) =>
  API.get(`/user/${userId}`);



export default API;
