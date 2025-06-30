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
export const updateUserNickname = (id: string, nickname: string) => async (dispatch: any) => {
  try {
    const { data } = await api.updateNickname(id, nickname);

    // userProfile güncelle
    dispatch({ type: "UPDATE_USER_PROFILE", payload: data });

    // Eğer güncellenen kullanıcı giriş yapan kullanıcıysa:
    const localUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (localUser?.result?._id === id) {
      localUser.result.nickname = data.nickname;
      localStorage.setItem("user", JSON.stringify(localUser));
      dispatch({ type: "SET_USER", payload: localUser });
    }

    // Kullanıcının postlarını tekrar getir, böylece güncellenmiş nickname ile gelir
    const posts = await dispatch(getPostsByUser(id));
    // Eğer posts reducer’ında böyle bir yapı yoksa, getPostsByUser’ın sonucu otomatik store’a geçiyordur.

  } catch (error) {
    console.error("Nickname güncellenemedi:", error);
  }
};
