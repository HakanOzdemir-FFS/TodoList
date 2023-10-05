import React from "react";

const Login = () => {
  return (
    <div className=" items-center justify-center flex flex-col space-y-10 font-bold text-2xl z-50">
      <div className="flex justify-center items-center space-x-12">
        <span className="w-24">Email:</span>
        <input
          className="border-2 py-2 pl-4 pr-28"
          type="email"
          placeholder="Email"
        />
      </div>
      <div className="flex justify-center items-center space-x-12">
        <span className="w-24">Password:</span>
        <input
          className="border-2 py-2 pl-4 pr-28"
          type="password"
          placeholder="Password"
        />
      </div>
      <button className="w-[50%] bg-sky-500 text-white py-2 rounded-md">
        Log In
      </button>
    </div>
  );
};

export default Login;
