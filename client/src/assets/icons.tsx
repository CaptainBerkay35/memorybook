export const MemoryBookIcon = ({ size = 28, color = "#751a1a" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
  >
    <path
      fill={color}
      d="M7 17V2h7.875q-.2.475-.288.975T14.5 4H9v10.2q1.125-1.05 2.538-1.625T14.5 12q1.525 0 2.95.588T20 14.225V9.5q.525 0 1.025-.088T22 9.125V17zm-3.4 5.225L1.75 7.35L5 6.95v2l-1 .125L5.35 20l7.45-1h5.45l.15 1.4zM17.675 6.5l1.775-5h1.1l1.8 5h-1.075L20.9 5.4h-1.8l-.375 1.1zm1.675-1.85h1.3L20 2.6zM14.5 14q-.875 0-1.725.25T11.2 15h6.6q-.725-.5-1.575-.75T14.5 14m0-8.5q1.15 0 1.95.8t.8 1.95t-.8 1.95t-1.95.8t-1.95-.8t-.8-1.95t.8-1.95t1.95-.8m0 2q-.325 0-.537.213t-.213.537t.213.538T14.5 9t.538-.213t.212-.537t-.213-.537T14.5 7.5"
    />
  </svg>
);

export const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
  >
    <path
      fill="#000"
      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
    />
  </svg>
);
export const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
  >
    <path
      fill="#000"
      d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1q-.15.15-.15.36M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"
    />
  </svg>
);

import  { useEffect, useState } from "react";

type LikeIconProps = {
  filled: boolean;       // Kalp dolu mu?
  onClick?: () => void;  // Tıklama event'i
};

export const LikeIcon = ({ filled, onClick }: LikeIconProps) => {
  // Animasyon durumunu tutuyoruz
  const [animating, setAnimating] = useState(false);
  // Önceki dolu hali için state (animasyon tetiklemek için)
  const [prevFilled, setPrevFilled] = useState(filled);

  useEffect(() => {
    if (filled !== prevFilled) {
      setAnimating(true);
      setPrevFilled(filled);
      // 600ms sonra animasyonu kapatıyoruz (CSS transition süresiyle uyumlu)
      const timeout = setTimeout(() => setAnimating(false), 600);
      return () => clearTimeout(timeout);
    }
  }, [filled, prevFilled]);

  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      className="cursor-pointer"
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
           4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 
           19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill={filled ? "#ef4444" : "none"}
        stroke="#ef4444"
        strokeWidth="2"
        style={{
          transition: animating ? "fill 0.6s ease" : "none",
          pointerEvents: "auto",
        }}
      />
    </svg>
  );
};

export const DropDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      fill="#000"
      d="M6 14q-.825 0-1.412-.587T4 12t.588-1.412T6 10t1.413.588T8 12t-.587 1.413T6 14m6 0q-.825 0-1.412-.587T10 12t.588-1.412T12 10t1.413.588T14 12t-.587 1.413T12 14m6 0q-.825 0-1.412-.587T16 12t.588-1.412T18 10t1.413.588T20 12t-.587 1.413T18 14"
    />
  </svg>
);
export const ProfileIconEmpty = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      fill="#000"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88a9.95 9.95 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20"
    />
  </svg>
);
