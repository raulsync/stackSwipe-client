import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addUser } from "../store/features/userSlice.js";
import { BASE_URL } from "../utils/constants";
import {
  Mail,
  Lock,
  User,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  Heart,
} from "lucide-react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (!formData.emailId || !formData.password) {
        throw new Error("Please fill in all required fields");
      }

      if (!isLogin && (!formData.firstName || !formData.lastName)) {
        throw new Error("Please fill in all required fields");
      }

      const endpoint = isLogin ? "/login" : "/signup";
      const payload = isLogin
        ? { emailId: formData.emailId, password: formData.password }
        : formData;

      const res = await axios.post(`${BASE_URL}${endpoint}`, payload, {
        withCredentials: true,
      });

      dispatch(addUser(isLogin ? res.data : res.data.data));
      navigate(isLogin ? "/feed" : "/profile");
    } catch (error) {
      setError(
        error?.response?.data || error.message || "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuth = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({
      firstName: "",
      lastName: "",
      emailId: "",
      password: "",
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl overflow-hidden animate-scale-in">
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-black">StackSwipe</h1>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">
                {isLogin ? "Welcome Back" : "Join StackSwipe"}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                {isLogin
                  ? "Sign in to continue your journey"
                  : "Start your journey to meaningful connections"}
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {!isLogin && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-gray-700">
                        First Name
                      </span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        className="input w-full pl-10 bg-white border-gray-300 focus:border-black focus:ring-1 focus:ring-black transition-all duration-200 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-gray-700">
                        Last Name
                      </span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        className="input w-full pl-10 bg-white border-gray-300 focus:border-black focus:ring-1 focus:ring-black transition-all duration-200 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    Email
                  </span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="input w-full pl-10 bg-white border-gray-300 focus:border-black focus:ring-1 focus:ring-black transition-all duration-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="input w-full pl-10 pr-12 bg-white border-gray-300 focus:border-black focus:ring-1 focus:ring-black transition-all duration-200 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="alert bg-red-50 border border-red-200 text-red-700 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn w-full text-lg bg-black text-white border-none hover:bg-gray-800 transition-colors duration-200 rounded-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>

              <div className="divider text-gray-500">OR</div>

              <button
                type="button"
                onClick={toggleAuth}
                className="btn btn-outline w-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 rounded-lg"
              >
                {isLogin ? "Create new account" : "Sign in to existing account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
