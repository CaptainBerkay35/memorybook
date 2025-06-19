import { fetchUserById } from "../api";

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
