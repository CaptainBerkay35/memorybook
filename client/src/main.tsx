// main.tsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.tsx";

import { Provider } from "react-redux";
import store from "./store/store.tsx";
import { BrowserRouter } from "react-router-dom";

import AppWrapper from "./components/AppWrapper.tsx"; // Yol sana göre değişebilir

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="839478508538-11uq60banp6flprvf523i5bgrfb00j4k.apps.googleusercontent.com">
      <Provider store={store}>
        <BrowserRouter>
          <AppWrapper>
            <App />
          </AppWrapper>
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
);
