import { Link } from "react-router";
import { useAuthStore } from "../stores/authStore";

const Navbar = () => {
  const { user } = useAuthStore();
  return (
    <div className="bg-primary-900 text-white p-6 sticky top-0 z-10 flex justify-between items-center h-24">
      <Link
        to="/"
        className="text-xl font-semibold hover:text-blue-200 transition-colors duration-300"
      >
        Harmony Sketch
      </Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link
              to="/dashboard"
              className="text-lg font-semibold bg-blue-600 cursor-pointer hover:bg-blue-700 transition-colors duration-300 rounded-full px-4 py-2"
            >
              Dashboard
            </Link>
            <p className="bg-blue-600 px-4 text-xl py-2 rounded-full">
              {user?.email?.[0].toUpperCase()}
            </p>
          </>
        ) : (
          <Link
            to="/auth/signin"
            className="text-lg font-semibold bg-blue-600 cursor-pointer hover:bg-blue-700 transition-colors duration-300 rounded-full px-4 py-2"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
