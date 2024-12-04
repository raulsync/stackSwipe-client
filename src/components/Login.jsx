import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [emailId, setEmailId] = useState("mark@mail.com");
  const [password, setPassword] = useState("Mark@123");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7777/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
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
