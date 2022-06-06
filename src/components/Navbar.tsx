import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="border-b">
      <div className="container xl:max-w-6xl mx-auto p-3 flex justify-between items-center">
      <Link to="/" className="text-2xl font-semibold">
        Note It
      </Link>
      <Link to="/login" className="btn-secondary">Login</Link>
    </div>
    </div>
  );
};
