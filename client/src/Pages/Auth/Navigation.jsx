import { useState } from "react";
import {
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { IoIosArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/authSlice";
import { useLogoutMutation } from "../../redux/api/userApi";

// Dropdown Component
const Dropdown = ({ logoutHandler }) => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-gray-800 p-2 rounded shadow-md flex flex-col z-auto ">
      <Link
        to="/profile"
        className="text-white text-lg py-1 hover:text-gray-400"
      >
        Profile
      </Link>
      <Link
        to="/write-blog"
        className="text-white text-lg py-1 hover:text-gray-400"
      >
        Write a Blog
      </Link>
      <button
        className="text-white text-lg py-1 hover:text-gray-400 flex gap-2"
        onClick={logoutHandler}
      >
        <AiOutlineLogout size={22} /> Logout
      </button>
    </div>
  );
};

// Main Navigation Component
const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header>
      <nav className="flex justify-between items-center bg-gray-700 py-5 px-8 z-50">
        {/* Blog Name/Logo */}
        <div className="font-bold text-white">
          <h1 className="tracking-wider text-xl">
            My<span className="text-yellow-500">Blog</span>
          </h1>
        </div>

        {/* Main Navigation Links */}
        <div className="flex gap-5 font-bold">
          <Link to="/" className="text-white hover:text-gray-400">
            Home
          </Link>
          <Link to="/blogs" className="text-white hover:text-gray-400">
            Blog
          </Link>
          <Link to="/about" className="text-white hover:text-gray-400">
            About
          </Link>
          <Link to="/contact" className="text-white hover:text-gray-400">
            Contact
          </Link>
        </div>

        {/* User Authentication Links */}
        <div className="relative">
          {userInfo ? (
            <div className="flex items-center gap-4">
              <span className="text-white font-bold text-sm">
                {userInfo.username}
              </span>
              <div className="relative">
                <button
                  className="text-white cursor-pointer flex items-center gap-2"
                  onClick={toggleDropdown}
                >
                  <IoIosArrowDropdown size={24} />
                </button>
                {dropdownOpen && <Dropdown logoutHandler={logoutHandler} />}
              </div>
            </div>
          ) : (
            <div className="flex gap-5 text-white">
              <Link to="/login" className="flex items-center gap-2">
                <AiOutlineLogin size={24} />
                <span className="font-semibold text-lg">Login</span>
              </Link>
              <Link to="/register" className="flex items-center gap-2">
                <AiOutlineUserAdd size={24} />
                <span className="font-semibold text-lg">Sign Up</span>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
