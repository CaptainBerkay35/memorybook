import { useEffect, useState } from "react";
import Form from "../components/Form/Form.tsx";
import MainLayout from "../layout/MainLayout.tsx";
import Posts from "../components/Posts/Posts.tsx";
import Slider from "../components/Slider/Slider.tsx";

export default function HomePage() {
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setShowSlider(!user); // user yoksa slider göster
  }, []);

  return (
    <MainLayout>
      {showSlider && <Slider />}
      <Form />
      <Posts />
    </MainLayout>
  );
}
