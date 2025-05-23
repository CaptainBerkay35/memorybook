import * as api from "../api";
import type { Dispatch } from "redux";
import type { AuthFormData } from "../types/Auth";

// Eğer react-router-dom'un useNavigate'ini kullanıyorsan navigate fonksiyonunu parametre olarak al
export const signin =
  (formData: AuthFormData, navigate: (path: string) => void) =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await api.signIn(formData);

      // localStorage'a kaydet
      localStorage.setItem("user", JSON.stringify(data));

      dispatch({ type: "AUTH", payload: data });

      // Başarılı giriş sonrası yönlendir
      navigate("/");
    } catch (error: any) {
      console.error("Giriş hatası:", error.response?.data || error.message);
      throw error;
    }
  };

export const signup =
  (formData: AuthFormData, navigate: (path: string) => void) =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await api.signUp(formData);

      // localStorage'a kaydet
      localStorage.setItem("user", JSON.stringify(data));

      dispatch({ type: "AUTH", payload: data });

      // Kayıt sonrası yönlendir
      navigate("/");
    } catch (error: any) {
      console.error("Kayıt olma hatası:", error.response?.data || error.message);
      throw error;
    }
  };
