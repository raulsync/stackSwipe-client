import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../store/features/userSlice";
import { BASE_URL } from "../utils/constants";
import { LogOut, User2, Users, Bell, Home } from "lucide-react";

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
    { path: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
    { path: "/profile", label: "Profile", icon: <User2 className="w-4 h-4" /> },
    {
      path: "/connections",
      label: "Connections",
      icon: <Users className="w-4 h-4" />,
    },
    {
      path: "/requests",
      label: "Requests",
      icon: <Bell className="w-4 h-4" />,
    },
  ];

  return (
    <div className="navbar bg-base-200 shadow-sm px-4 fixed top-0 z-50 w-full">
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost normal-case text-xl font-bold hover:bg-base-300 transition-colors duration-200"
        >
          StackSwipe
        </Link>
      </div>

      {user && (
        <div className="flex-none gap-4">
          <div className="hidden md:flex items-center gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`btn btn-ghost btn-sm ${
                  location.pathname === item.path ? "bg-base-300" : ""
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar online"
        >
          {user?.photoUrl ? (
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                alt={`${user.firstName}'s profile`}
                src={user.photoUrl}
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center">
              <User2 className="w-6 h-6" />
            </div>
          )}
        </div>

        <ul
          tabIndex={0}
          className="menu dropdown-content bg-base-100 rounded-box shadow-lg mt-3 w-52 p-2"
        >
          {/* Mobile-only menu items */}
          <div className="md:hidden border-b border-base-200 mb-2 pb-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? "active" : ""}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </div>

          {/* Common menu items */}
          {user && (
            <div className="px-4 py-2 border-b border-base-200">
              <p className="font-semibold">{`${user.firstName} ${user.lastName}`}</p>
              <p className="text-sm text-base-content/70">View profile</p>
            </div>
          )}

          <li>
            <button
              onClick={handleLogout}
              className="text-error hover:bg-error/10 hover:text-error"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
