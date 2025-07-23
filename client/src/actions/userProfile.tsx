import * as api from "../api";
import { fetchUserById } from "../api";
import { getPostsByUser } from "./posts";


export const getUserProfile = (userId: string) => async (dispatch: any) => {
  try {
    dispatch({ type: "FETCH_USER_PROFILE_START" });

    const { data } = await fetchUserById(userId);

    dispatch({ type: "FETCH_USER_PROFILE_SUCCESS", payload: data });
  } catch (error: any) {
    dispatch({
      type: "FETCH_USER_PROFILE_FAILURE",
      payload: error.response?.data?.message || error.message,
    });
  }
};
export const updateUserProfile = (id: string, updates: { nickname?: string; profilePicture?: string }) => async (dispatch: any) => {
  try {
    const { data } = await api.updateUserProfile(id, updates);

    dispatch({ type: "UPDATE_USER_PROFILE", payload: data });

    const localUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (localUser?.result?._id === id) {
      localUser.result.nickname = data.nickname;
      localUser.result.profilePicture = data.profilePicture;
      localStorage.setItem("user", JSON.stringify(localUser));
      dispatch({ type: "SET_USER", payload: localUser });
    }

    dispatch(getPostsByUser(id)); 
    dispatch(getUserProfile(id));
  } catch (error) {
    console.error("Profile update error:", error);
  }
};

export const deleteUserAccount = (id: string) => async (dispatch: any) => {
  try {
    await api.deleteAccount(id);

    // Kullanıcı localStorage'dan siliniyor
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });

    // İsteğe bağlı: Başka işlemler yapılabilir (redirect vs.)
  } catch (error) {
    console.error("Account deletion error:", error);
  }
};