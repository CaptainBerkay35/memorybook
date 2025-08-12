import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import TagPage from "./pages/TagPage.tsx";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./actions/users.tsx";
import type { User } from "./types/User.tsx";
import { injectNavigate } from "./api/index.tsx";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    injectNavigate(navigate);
  }, [navigate]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      dispatch(setUser(user));
    }
    setLoadingUser(false); 
  }, [dispatch]);
  if (loadingUser) {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/profile/:id" element={<ProfilePage />} /> 
      <Route path="/tags/:tag" element={<TagPage />} />

    </Routes>
  );
}

export default App;
