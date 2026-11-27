import { useState, useRef, useEffect } from "react";
import { ChevronDown, CircleUserRound, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router";

const AccountDropdown = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-gray-100"
      >
        <CircleUserRound size={20} />
        <span>Mitt konto</span>
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
          <div className="border-b border-gray-100 px-3 py-3">
            <p className="truncate text-sm font-semibold">
              {user?.displayName || "Mitt konto"}
            </p>
            <p className="truncate text-xs text-gray-500">{user?.email}</p>
          </div>

          <Link
            to="/create-listing"
            className="block px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
          >
            Skapa annons
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-2 flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-100"
          >
            <LogOut size={17} />
            Logga ut
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
