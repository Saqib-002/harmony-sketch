import { Outlet, useNavigate } from "react-router";
import Navbar from "../../components/Navbar";
import { useAuthStore } from "../../stores/authStore";

const AuthLayout = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  if (user) {
    navigate("/dashboard");
  }
  return (
    <div className="bg-primary-100 h-full text-white">
      <Navbar />
      <div className="h-[calc(100vh-96px)] flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
