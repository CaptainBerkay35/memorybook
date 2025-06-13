import { useState } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  {
    src: "/images/sliderImage.jpg",
    title: "Anılarınızı Kaydedin",
    description: "Her anı, özel bir hikâyeye dönüşsün.",
  },
  {
    src: "/images/sliderImage3.jpg",
    title: "Geriye Dönüp Bakın",
    description: "Geçmişin güzelliklerini tekrar yaşayın.",
  },
  {
    src: "/images/sliderImage2.jpg",
    title: "Geriye Dönüp Bakın",
    description: "Geçmişin güzelliklerini tekrar yaşayın.",
  },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  function navigateSignUp() {
    navigate("/auth");
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full">
      {/* Carousel wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
          >
            <img
              src={img.src}
              alt={`Slide ${index + 1}`}
              className="absolute block w-full h-full object-cover top-0 left-0"
            />
            {/* Text overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 text-white text-center px-4">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">
                {img.title}
              </h2>
              <p className="text-sm md:text-lg">{img.description}</p>
            </div>
            <div className="absolute inset-0  flex flex-col justify-end items-center mb-6">
              <button
                className="py-2 px-6 text-white text-lg bg-primary rounded"
                onClick={navigateSignUp}
              >
                Create Memory
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Slider controls */}
      <button
        onClick={prevSlide}
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
        aria-label="Previous Slide"
      >
        <svg
          className="w-5 h-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
        aria-label="Next Slide"
      >
        <svg
          className="w-5 h-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </button>
    </div>
  );
}
