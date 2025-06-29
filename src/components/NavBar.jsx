import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../store/features/userSlice";
import { BASE_URL } from "../utils/constants";
import {
  LogOut,
  User2,
  Users,
  Bell,
  Heart,
  Menu,
  Sparkles,
} from "lucide-react";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const menuItems = [
    { path: "/", label: "Discover", icon: <Sparkles className="w-5 h-5" /> },
    {
      path: "/connections",
      label: "Connections",
      icon: <Users className="w-5 h-5" />,
    },
    {
      path: "/requests",
      label: "Requests",
      icon: <Bell className="w-5 h-5" />,
    },
    { path: "/profile", label: "Profile", icon: <User2 className="w-5 h-5" /> },
  ];

  return (
    <div className="navbar bg-white/10 backdrop-blur-xl shadow-sm px-4 fixed top-0 z-50 w-full border-b border-white/20">
      <div className="navbar-start">
        <Link
          to="/"
          className="btn btn-ghost text-xl font-bold hover:bg-white/10 transition-all duration-300 group"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cosmic-500 to-nebula-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="hidden sm:inline bg-gradient-to-r from-cosmic-600 to-nebula-600 bg-clip-text text-transparent">
              StackSwipe
            </span>
          </div>
        </Link>
      </div>

      {user && (
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`btn btn-ghost btn-sm hover:bg-white/10 transition-all duration-300 ${
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-cosmic-500 to-nebula-500 text-white shadow-lg"
                      : "text-gray-700 hover:text-cosmic-600"
                  }`}
                >
                  <div
                    className={`transition-transform duration-300 ${
                      location.pathname === item.path
                        ? "scale-110"
                        : "group-hover:scale-110"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span className="hidden xl:inline">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:bg-white/10 hover:scale-110 transition-all duration-300 relative group"
            >
              {user?.photoUrl ? (
                <div className="w-10 rounded-full ring-2 ring-cosmic-300 group-hover:ring-cosmic-500 transition-all duration-300">
                  <img
                    alt={`${user.firstName}'s profile`}
                    src={user.photoUrl}
                    className="object-cover rounded-full"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cosmic-400 to-nebula-400 flex items-center justify-center group-hover:from-cosmic-500 group-hover:to-nebula-500 transition-all duration-300">
                  <User2 className="w-6 h-6 text-white" />
                </div>
              )}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-aurora-400 rounded-full animate-pulse"></div>
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl mt-3 w-64 p-4 border border-white/30"
            >
              <div className="px-4 py-3 border-b border-white/20 mb-2">
                <p className="font-semibold text-gray-800">{`${user.firstName} ${user.lastName}`}</p>
                <p className="text-sm text-gray-600">{user.emailId}</p>
              </div>

              <div className="lg:hidden border-b border-white/20 mb-2 pb-2">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 rounded-xl transition-all duration-300 ${
                        location.pathname === item.path
                          ? "bg-gradient-to-r from-cosmic-500 to-nebula-500 text-white"
                          : "hover:bg-white/10 text-gray-700"
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </div>

              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:bg-red-50 hover:text-red-600 flex items-center gap-3 rounded-xl transition-all duration-300"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn bg-gradient-to-r from-cosmic-500 to-nebula-500 text-white border-none hover:from-cosmic-600 hover:to-nebula-600 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Get Started
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
