import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/users";
import { MemoryBookIcon, NewPostIcon } from "../../assets/icons";
import type { RootState } from "../../store/store";
import Form from "../Form/Form.tsx";

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
  };

  return (
    <header
  className={`sticky top-0 z-50 bg-white bg-opacity-80 transition-all duration-300 ease-in-out ${
    isSticky ? "after:content-[''] after:absolute after:inset-0 after:backdrop-blur-md after:-z-10" : ""
  }`}
>
      <div className="container mx-auto px-4 py-2 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4 font-montserrat text-text text-base md:text-lg font-medium">
          <MemoryBookIcon />
          <h1>MemoryBook</h1>
        </div>

        <div>
          {user ? (
            <div className="relative flex gap-2" ref={dropdownRef}>
              <div
                className="flex items-center gap-2 cursor-pointer select-none"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                {user.result?.picture || user.picture ? (
                  <img
                    src={user.result?.picture || user.picture}
                    alt={user.result?.name || user.name || "User"}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold uppercase">
                    {(user.result?.name || user.name)
                      ?.charAt(0)
                      .toUpperCase() || "U"}
                  </div>
                )}
                <h6 className="font-semibold text-sm md:text-base">
                  {user.result?.name || user.name || "User"}
                </h6>
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md overflow-hidden z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-red-100 text-red-600 font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
              <button
                className="w-10 h-10 p-1"
                onClick={() => setOpenModal(true)}
              >
                <NewPostIcon size={36} />
              </button>
              <Form isOpen={openModal} onClose={() => setOpenModal(false)} />
            </div>
          ) : (
            <nav className="hidden md:flex font-montserrat text-text text-lg font-medium">
              <Link
                to="/auth"
                className="px-2 py-1 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition duration-300"
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
