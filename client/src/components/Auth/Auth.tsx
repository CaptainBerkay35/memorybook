import { useState } from "react";
import InputField from "./InputField/InputField";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import type { CredentialResponse } from "@react-oauth/google";
import { setUser } from "../../actions/users";
import type { AppDispatch } from "../../store/store";
import type { User } from "../../types/User";
import { useNavigate } from "react-router-dom";
import { MemoryBookIcon } from "../../assets/icons";
import type { AuthFormData } from "../../types/Auth";
import { signin, signup } from "../../actions/auth";

const initialState: AuthFormData = {
  nickname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AuthFormData>(initialState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await dispatch(signup(formData, navigate));
      } else {
        await dispatch(signin(formData, navigate));
      }
    } catch (error) {
      alert("Bir hata oluştu. Lütfen bilgilerinizi kontrol edin.");
      console.error("Form gönderim hatası:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGoogleLogin = async (res: CredentialResponse) => {
    try {
      if (!res.credential) {
        console.log("Google credential yok.");
        return;
      }

      const response = await fetch("http://localhost:5000/user/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential: res.credential }),
      });

      if (!response.ok) throw new Error("Google login başarısız.");

      const data = await response.json();

      dispatch(setUser(data));
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      console.error("Google Login Hatası:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-blue-200 px-4">
      <div className="bg-white p-8 shadow-md w-full max-w-md rounded-xl">
        <div className="flex items-center gap-3 mb-6">
          <MemoryBookIcon />
          <h1 className="text-2xl font-bold text-blue-600 font-montserrat">
            MemoryBook
          </h1>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <InputField
              label="Kullanıcı Adı"
              name="nickname"
              type="text"
              placeholder="Enter Nickname max 20 characters"
              required
              minLength={3}
              maxLength={20}
              onChange={handleChange}
            />
          )}
          <InputField
            label="E-posta"
            name="email"
            type="email"
            placeholder="example@mail.com"
            required
            minLength={3}
            maxLength={30}
            onChange={handleChange}
          />

          <InputField
            label="Şifre"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            minLength={3}
            maxLength={20}
            onChange={handleChange}
            showPasswordToggle
          />

          {isSignUp && (
            <InputField
              label="Şifre (Tekrar)"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              required
              minLength={3}
              maxLength={20}
              onChange={handleChange}
              showPasswordToggle
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            {isSignUp ? "Kayıt Ol" : "Giriş Yap"}
          </button>
        </form>

        <div className="mt-5 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>

        <p className="text-center text-sm text-gray-700 mt-6">
          {isSignUp ? "Zaten hesabınız var mı?" : "Hesabınız yok mu?"}{" "}
          <button
            onClick={() => setIsSignUp((prev) => !prev)}
            className="text-blue-600 font-medium hover:underline"
          >
            {isSignUp ? "Giriş Yap" : "Kayıt Ol"}
          </button>
        </p>
      </div>
    </div>
  );
}
