import React from "react";

const NavBar = () => {
  return (
    <div className="w-full h-32 flex justify-between bg-sky-500 ">
      <div className="py-3 flex items-center space-x-5">
        <img
          className="w-24 rounded-full ml-10"
          src="/img/logo.jpg"
          alt="logo"
        />
        <label
          className="text-5xl font-sans font-bold uppercase tracking-widest text-white"
          htmlFor="#"
        >
          Fayfoysix
        </label>
      </div>
      <div className="flex justify-between items-center mr-10 space-x-10">
        <button className="w-32 h-16 rounded-2xl text-2xl font-sans font-bold bg-white shadow-md hover:bg-cyan-100 transition-all duration-200">
          Log In
        </button>
        <button className="w-32 h-16 rounded-2xl text-2xl font-sans font-bold bg-white shadow-md hover:bg-cyan-100 transition-all duration-200">
          Sign Up
        </button>
        <div className="justify-between items-center mr-10 space-x-10 hidden">
          <button className="lnr lnr-home text-5xl text-white hover:text-cyan-200 transition-all duration-200"></button>
          <button className="lnr lnr-alarm text-5xl text-white hover:text-cyan-200 transition-all duration-200"></button>
          <button className="lnr lnr-cog text-5xl text-white hover:text-cyan-200 transition-all duration-200"></button>
          <button className="lnr lnr-user text-5xl text-white hover:text-cyan-200 transition-all duration-200"></button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
