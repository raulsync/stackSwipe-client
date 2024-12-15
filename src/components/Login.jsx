import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/features/userSlice.js";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("mark@mail.com");
  const [password, setPassword] = useState("Mark@123");
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

  return (
    <div className="flex justify-center items-center h-[600px]">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body flex gap-2">
          <h2 className="card-title font-bold">Login</h2>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-semibold">Email :</span>
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
              <span className="label-text font-semibold">Password :</span>
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
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
