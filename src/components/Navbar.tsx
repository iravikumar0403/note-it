import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/user-context";
import { useOnOutsideClick } from "../hooks/useOnOutsideClick";
import { Avatar } from "./Avatar";

type props = {
  logoOnly?: boolean;
};

export const Navbar = ({ logoOnly }: props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const elementRef = useOnOutsideClick(() => setShowDropdown(false));
  const { user, logout } = useUserContext();
  return (
    <div className="border-b">
      <div className="max-w-screen-2xl mx-auto p-3 px-5 flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold">
          Note It
        </Link>
        {!logoOnly &&
          (user ? (
            <div className="relative" ref={elementRef}>
              <button onClick={() => setShowDropdown((prev) => !prev)}>
                <Avatar />
              </button>
              {showDropdown && (
                <div className="absolute bg-gray-100 shadow right-0 my-1 p-2 rounded">
                  <button
                    className="btn-secondary border-0 w-full"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn-secondary">
              Login
            </Link>
          ))}
      </div>
    </div>
  );
};
