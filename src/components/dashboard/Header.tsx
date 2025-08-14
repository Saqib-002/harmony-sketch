import { Link } from "react-router";
import { useAuthStore } from "../../stores/authStore";
import { Button } from "../ui/button";
import { toast } from "sonner";
import Logo from "../../assets/logo.png"

const DashboardHeader = () => {
  const { user, logout } = useAuthStore();
  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
  };
  return (
    <div className="bg-primary-900 text-white p-6 sticky top-0 z-10 flex justify-between items-center h-24">
      <Link
        to="/"
        className="text-xl font-semibold  rounded-full p-2 hover:bg-primary-100 transition-colors duration-300"
      >
        <img src={Logo} className="size-8 shadow-2xl" alt="Description" />
      </Link>
      <div className="flex items-center gap-4">
        <Button
          className="text-lg font-semibold bg-blue-600 cursor-pointer hover:bg-blue-700 transition-colors duration-300 rounded-full"
          onClick={handleLogout}
        >
          Logout
        </Button>
        <p className="bg-blue-600 px-4 text-xl py-2 rounded-full w-max">
          {user?.email?.[0].toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default DashboardHeader;
