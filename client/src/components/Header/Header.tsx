import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "../../actions/users";
import { MemoryBookIcon } from "../../assets/icons";
import type { RootState } from "../../store/store";

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-background shadow-md transition-all duration-300 ease-in-out ${
        isSticky ? "bg-opacity-90 shadow-lg" : "bg-opacity-100 shadow-md"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 font-montserrat text-text text-lg font-medium">
          <MemoryBookIcon />
          <h1>MemoryBook</h1>
        </div>
        <div>
          {user ? (
            <div className="flex items-center gap-4 cursor-pointer select-none">
              {user.result?.picture || user.picture ? (
                <img
                  src={user.result?.picture || user.picture}
                  alt={user.result?.name || user.name || "User"}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold uppercase">
                  {(user.result?.name || user.name)?.charAt(0).toUpperCase() ||
                    "U"}
                </div>
              )}
              <h6 className="font-semibold">
                {user.result?.name || user.name || "User"}
              </h6>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <nav className="hidden md:flex font-montserrat text-text text-lg font-medium">
              <Link
                to="/auth"
                className="px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition duration-300"
              >
                Login
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
