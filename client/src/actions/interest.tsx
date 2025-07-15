import * as api from "../api";
import { setUser } from "./users.tsx"; // user reducer'a yeni data eklemek için

export const updateUserInterests = (id: string, interests: string[]) => async (dispatch: any) => {
  try {
    const { data } = await api.updateUserInterests(id, interests);

    // localStorage'ı güncelle
    const localUser = JSON.parse(localStorage.getItem("user") || "{}");
    localUser.result.interests = data.interests;
    localStorage.setItem("user", JSON.stringify(localUser));

    // Redux state'i güncelle
    dispatch(setUser(localUser));
  } catch (error) {
    console.error("Update interests error:", error);
  }
};

export const fetchUserInterests = (id: string) => async (dispatch: any) => {
  try {
    const { data } = await api.fetchUserInterests(id);

    dispatch({
      type: "SET_USER_INTERESTS",
      payload: data.interests,
    });
  } catch (error) {
    console.error("Fetch interests error:", error);
  }
};
