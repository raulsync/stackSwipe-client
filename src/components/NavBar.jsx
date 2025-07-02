import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../store/features/userSlice";
import { BASE_URL } from "../utils/constants";
import { LogOut, User2, Users, Bell, Heart } from "lucide-react";

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
    { path: "/feed", label: "Discover", icon: <Heart className="w-5 h-5" /> },
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
    <div className="navbar bg-white border-b border-gray-200 px-4 fixed top-0 z-50 w-full">
      <div className="navbar-start">
        <Link
          to={"/feed"}
          className="btn btn-ghost text-xl font-bold text-black hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="hidden sm:inline">StackSwipe</span>
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
                  className={`btn btn-ghost btn-sm transition-all duration-200 ${
                    location.pathname === item.path
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-100"
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
              className="btn btn-ghost btn-circle avatar hover:bg-gray-100 transition-colors duration-200"
            >
              {user?.photoUrl ? (
                <div className="w-10 rounded-full ring-2 ring-gray-200">
                  <img
                    alt={`${user.firstName}'s profile`}
                    src={user.photoUrl}
                    className="object-cover rounded-full"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <User2 className="w-6 h-6 text-gray-600" />
                </div>
              )}
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content bg-white rounded-lg shadow-lg border border-gray-200 mt-3 w-64 p-4"
            >
              <div className="px-4 py-3 border-b border-gray-200 mb-2">
                <p className="font-semibold text-gray-900">{`${user.firstName} ${user.lastName}`}</p>
                <p className="text-sm text-gray-600">{user.emailId}</p>
              </div>

              <div className="lg:hidden border-b border-gray-200 mb-2 pb-2">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 rounded-lg transition-colors duration-200 ${
                        location.pathname === item.path
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-700"
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
                  className="text-red-600 hover:bg-red-50 flex items-center gap-3 rounded-lg transition-colors duration-200"
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
            className="btn bg-black text-white border-none hover:bg-gray-800 transition-colors duration-200"
          >
            Get Started
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
