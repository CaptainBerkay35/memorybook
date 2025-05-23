import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../actions/users.tsx"; 

type AppWrapperProps = {
  children: React.ReactNode;
};

export default function AppWrapper({ children }: AppWrapperProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  return <>{children}</>;
}
