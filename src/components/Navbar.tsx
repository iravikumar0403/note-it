import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="container xl:max-w-6xl mx-auto p-3 flex justify-between items-center">
      <Link to="/" className="text-2xl font-semibold">
        Note It
      </Link>
      <button className="btn-secondary">Login</button>
    </div>
  );
};
