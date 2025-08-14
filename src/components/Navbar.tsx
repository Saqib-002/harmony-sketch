import { Link } from "react-router";
import { useAuthStore } from "../stores/authStore";

const Navbar = () => {
  const {user}=useAuthStore();
  return (
    <div className="bg-primary-900 text-white p-6 sticky top-0 z-10 flex justify-between">
        <Link to="/" className="text-xl font-semibold">Harmony Sketch</Link>
        <div>
            {
              user ?(
                <p>{user.email}</p>
              ):(
                <Link to="/auth/signin">Sign In</Link>
              )
            }
        </div>
    </div>
  )
}

export default Navbar