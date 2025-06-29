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
  Sparkles,
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
      navigate(isLogin ? "/" : "/profile");
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
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-cosmic-50 via-nebula-50 to-aurora-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-cosmic-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-nebula-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-aurora-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-white/20 backdrop-blur-xl shadow-2xl border border-white/30 rounded-3xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cosmic-500 to-nebula-500 rounded-2xl flex items-center justify-center relative animate-glow">
                  <Heart className="w-7 h-7 text-white" />
                  <Sparkles className="w-4 h-4 text-aurora-300 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cosmic-600 to-nebula-600 bg-clip-text text-transparent">
                  StackSwipe
                </h1>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800">
                {isLogin ? "Welcome Back!" : "Join StackSwipe"}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                {isLogin
                  ? "Sign in to continue your journey "
                  : "Start your journey to meaningful connections "}
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
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cosmic-500 transition-colors duration-300" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        className="input w-full pl-10 bg-white/50 backdrop-blur-sm border-white/30 focus:border-cosmic-400 focus:bg-white/70 transition-all duration-300 rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-gray-700">
                        Last Name
                      </span>
                    </label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cosmic-500 transition-colors duration-300" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        className="input w-full pl-10 bg-white/50 backdrop-blur-sm border-white/30 focus:border-cosmic-400 focus:bg-white/70 transition-all duration-300 rounded-xl"
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
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cosmic-500 transition-colors duration-300" />
                  <input
                    type="email"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="input w-full pl-10 bg-white/50 backdrop-blur-sm border-white/30 focus:border-cosmic-400 focus:bg-white/70 transition-all duration-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    Password
                  </span>
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cosmic-500 transition-colors duration-300" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="input w-full pl-10 pr-12 bg-white/50 backdrop-blur-sm border-white/30 focus:border-cosmic-400 focus:bg-white/70 transition-all duration-300 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cosmic-500 transition-colors duration-300"
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
                <div className="alert bg-red-100/50 border border-red-200 text-red-700 rounded-xl">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn w-full text-lg bg-gradient-to-r from-cosmic-500 to-nebula-500 text-white border-none hover:from-cosmic-600 hover:to-nebula-600 hover:scale-[1.02] transition-all duration-300 shadow-lg rounded-xl"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : isLogin ? (
                  "Sign In "
                ) : (
                  "Create Account "
                )}
              </button>

              <div className="divider text-gray-500">OR</div>

              <button
                type="button"
                onClick={toggleAuth}
                className="btn btn-outline w-full  text-cosmic-900 hover:bg-cosmic-600 hover:border-cosmic-400 hover:scale-[1.02] transition-all duration-300 rounded-xl"
              >
                {isLogin
                  ? "Create new account"
                  : "Sign in to existing account "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
