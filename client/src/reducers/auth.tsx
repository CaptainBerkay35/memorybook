import type { UserState } from "../types/User";

const initialState: UserState | null = null;

const userReducer = (
  state: UserState | null = initialState,
  action: any
): UserState | null => {
  switch (action.type) {
    case "AUTH":
    case "SET_USER":
      return action.payload;

    case "SET_USER_INTERESTS":
      if (!state || typeof state !== "object" || !("result" in state)) return state;

      return {
        ...state,
        result: {
          ...state.result,
          interests: action.payload,
        },
      };

    case "LOGOUT":
      return null;

    default:
      return state;
  }
};

export default userReducer;
