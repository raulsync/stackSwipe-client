import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../store/features/userSlice";
import { BASE_URL } from "../utils/constants";
import { LogOut, User2, Users, Bell, Heart, Menu } from "lucide-react";

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
    { path: "/", label: "Discover", icon: <Heart className="w-5 h-5" /> },
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
    <div className="navbar bg-base-200/95 backdrop-blur-sm shadow-lg px-4 fixed top-0 z-50 w-full border-b border-base-300">
      <div className="navbar-start">
        <Link
          to="/"
          className="btn btn-ghost text-xl font-bold text-primary hover:bg-primary/10 transition-all duration-200"
        >
          <Heart className="w-6 h-6 mr-2" />
          <span className="hidden sm:inline">stackSwipe</span>
        </Link>
      </div>

      {user && (
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`btn btn-ghost btn-sm ${
                    location.pathname === item.path
                      ? "bg-primary text-primary-content"
                      : "hover:bg-primary/10"
                  }`}
                >
                  {item.icon}
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
              className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all duration-200"
            >
              {user?.photoUrl ? (
                <div className="w-10 rounded-full">
                  <img
                    alt={`${user.firstName}'s profile`}
                    src={user.photoUrl}
                    className="object-cover rounded-full"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User2 className="w-6 h-6 text-primary" />
                </div>
              )}
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-box shadow-xl mt-3 w-64 p-4 border border-base-300"
            >
              {/* User Info */}
              <div className="px-4 py-3 border-b border-base-200 mb-2">
                <p className="font-semibold text-base-content">{`${user.firstName} ${user.lastName}`}</p>
                <p className="text-sm text-base-content/60">{user.emailId}</p>
              </div>

              {/* Mobile menu items */}
              <div className="lg:hidden border-b border-base-200 mb-2 pb-2">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 ${
                        location.pathname === item.path
                          ? "bg-primary/10 text-primary"
                          : ""
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
                  className="text-error hover:bg-error/10 hover:text-error flex items-center gap-3"
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
            className="btn btn-primary"
          >
            Get Started
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
