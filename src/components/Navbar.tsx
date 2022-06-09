import { Link } from "react-router-dom";
import { useUserContext } from "../context/user-context";

type props = {
  logoOnly?: boolean;
};

export const Navbar = ({ logoOnly }: props) => {
  const { user, logout } = useUserContext();
  return (
    <div className="border-b">
      <div className="container xl:max-w-6xl mx-auto p-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold">
          Note It
        </Link>
        {!logoOnly &&
          (user ? (
            <button className="btn-secondary" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn-secondary">
              Login
            </Link>
          ))}
      </div>
    </div>
  );
};
