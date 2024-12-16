import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/features/userSlice.js";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      // console.log(res.data);

      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
      console.log(error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      console.log(res?.data?.data);
      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
    } catch (error) {
      console.error("Error occured in signUp new user", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center my-10 h-[600px]">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body flex gap-2">
          <h2 className="card-title font-bold">
            {!isLogin ? "Sign Up" : "Login"}
          </h2>
          {!isLogin && (
            <>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-semibold">FirstName</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input  w-full max-w-xs"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-semibold">LastName</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input  w-full max-w-xs"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </>
          )}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-semibold">Email</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input  w-full max-w-xs"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-semibold">Password</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input  w-full max-w-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <p className="text-red-900 text-sm">{error}</p>
          <div className="card-actions justify-center my-2">
            <button
              className="btn btn-secondary w-44"
              onClick={isLogin ? handleLogin : handleSignUp}
            >
              {!isLogin ? "SignUp" : "Login"}
            </button>
          </div>
          <p
            className="text-center cursor-pointer text-blue-300"
            onClick={() => setIsLogin((prev) => !prev)}
          >
            {isLogin ? "New user signup here" : "Existing user login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
