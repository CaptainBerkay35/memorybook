import { useNavigate } from "react-router-dom";

export default function SeeMorePrompt() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/auth");
  };

  return (
    <div
      onClick={handleClick}
      className="relative  w-full h-[300px] md:h-[400px] cursor-pointer rounded-2xl overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: 'url("/images/sliderImage2.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      {/* Buğulu siyah overlay */}
      <div className="absolute inset-0 bg-white/60"></div>

      {/* İçerik */}
      <div className="relative z-10 text-center px-4 text-black">
        <h2 className="text-2xl md:text-3xl font-bold drop-shadow-lg">
          Daha Fazlasını Görmek İster misin?
        </h2>
        <p className="mt-3 text-sm md:text-base opacity-80 max-w-xl mx-auto">
          Tüm paylaşımlara erişmek için kaydol. En özel anıları kaçırma!
        </p>
        <button className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-200 transition">
          Fazlasını Gör
        </button>
      </div>
    </div>
  );
}
