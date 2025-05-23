import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./actions/users.tsx";
import type { User } from "./types/User.tsx";
import { injectNavigate } from "./api/index.tsx";

function App() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    injectNavigate(navigate);
  }, [navigate]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      dispatch(setUser(user));
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/auth" element={<AuthPage />}></Route>
    </Routes>
  );
}

export default App;
