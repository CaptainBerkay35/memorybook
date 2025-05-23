// actions/userActions.ts

import type { User } from "../types/User.tsx";

export const setUser = (user: User) => ({
  type: "AUTH",
  payload: user,
});
export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
