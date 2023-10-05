import React from "react";

const SignUp = () => {
  return (
    <div className=" flex justify-center items-baseline flex-col space-y-10 font-bold text-2xl">
      <div className="flex justify-start items-center space-x-12">
        <span className="w-24">Name:</span>
        <input
          className="border-2 py-2 pl-4 pr-28"
          type="text"
          placeholder="Name"
        />
      </div>
      <div className="flex justify-center items-center space-x-12">
        <span className="w-24">Surname:</span>
        <input
          className="border-2 py-2 pl-4 pr-28"
          type="text"
          placeholder="Surname"
        />
      </div>
      <div className="flex justify-center items-center space-x-12">
        <span className="w-24">Birthday:</span>
        <input className="border-2 py-2 pl-4 pr-28" type="date" />
      </div>
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
      <button className="w-[50%] bg-sky-500 text-white py-2 rounded-md self-center">
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
