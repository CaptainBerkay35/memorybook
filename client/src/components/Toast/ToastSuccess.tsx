import { useEffect } from "react";

type ToastProps = {
  message: string;
  duration?: number; // ms, default 3000
  onClose?: () => void;
};

export default function ToastSuccess({ message, duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-all duration-300 z-50 w-72">
      <p>{message}</p>
      <div className="h-1 bg-white/50 mt-2 rounded overflow-hidden">
        <div className="h-full bg-white animate-toast-timer"></div>
      </div>
    </div>
  );
}
