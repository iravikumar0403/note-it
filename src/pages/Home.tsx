import { Navbar, Footer } from "../components";
import { Link, Navigate } from "react-router-dom";
import notes_illustration from "../assets/images/note-illustration.svg";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useUserContext } from "../context/user-context";

export const Home = () => {
  useDocumentTitle("Note It");
  const { user } = useUserContext();

  if (user) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="container xl:max-w-6xl m-auto p-5 text-center">
        <h2 className="text-4xl font-semibold">
          Boost your productivity with one tool
        </h2>
        <p className="text-gray-600 text-sm m-4">
          Plan and organize your notes for free
        </p>
        <img
          className="mx-auto my-8 max-h-52"
          src={notes_illustration}
          alt="notes_illustration"
          width="80%"
        />
        <Link to="/signup" className="btn-primary px-10 py-2">
          Sign Up
        </Link>
      </div>
      <Footer />
    </div>
  );
};
