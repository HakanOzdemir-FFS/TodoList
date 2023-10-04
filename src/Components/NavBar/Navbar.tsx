import React, { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [animationName, setAnimationName] = useState("");

  const navBarHandler = () => {
    if (isOpen) {
      setAnimationName("slideOutToRight");
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    } else {
      setAnimationName("slideInFromRight");
      setIsOpen(true);
    }
  };

  return (
    <div className="max-w-full h-32 bg-sky-500">
      <div className="h-full max-w-[150rem] mx-auto flex justify-between items-center">
        <button className="my-auto max-w-6xl flex items-center space-x-5">
          <img
            className="w-24 rounded-full ml-10"
            src="/img/logo.jpg"
            alt="logo"
          />
          <span className="text-5xl font-sans font-bold uppercase tracking-widest text-white">
            Fayfoysix
          </span>
        </button>

        {/* Mobile NavBar */}
        <button
          onClick={navBarHandler}
          className={`w-24 h-24 mr-5 my-auto rounded-full flex flex-col justify-center items-center space-y-2 sm:hidden z-20 ${
            isOpen ? "bg-sky-500" : "bg-white"
          }`}
        >
          <span
            className={`w-10 h-[2px] z-20 ${isOpen ? "bg-white" : "bg-black"}`}
          ></span>
          <span
            className={`w-10 h-[2px] ${isOpen ? "bg-white" : "bg-black"}`}
          ></span>
          <span
            className={`w-10 h-[2px] ${isOpen ? "bg-white" : "bg-black"}`}
          ></span>
        </button>
        {isOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-white z-10"
            style={{ animation: `${animationName} 1s ease-in-out forwards` }}
          >
            <div className="mx-auto mt-5 w-48 flex items-center flex-col space-y-5">
              <img
                className="w-48 rounded-full "
                src="img/logo.jpg"
                alt="logo"
              />
              <label
                className="text-5xl font-sans font-bold uppercase tracking-widest text-black"
                htmlFor="#"
              >
                Fayfoysix
              </label>
            </div>

            <div className="w-[90%] justify-center mt-10 mx-auto flex flex-col items-center space-y-5 z-20">
              <button
                className=" h-20 rounded-2xl text-5xl font-sans font-bold bg-sky-500 self-stretch
                text-white shadow-md "
              >
                Log In
              </button>
              <button
                className="h-20 rounded-2xl text-5xl font-sans font-bold bg-sky-500 self-stretch
                text-white shadow-md"
              >
                Sign Up
              </button>
            </div>
            <div className="w-[90%] mt-10 mx-auto flex-col space-y-5 z-20 hidden">
              <button
                className="lnr lnr-home text-5xl w-full bg-sky-500 text-white hover:text-cyan-200 transition-all duration-200 
               py-3 px-1 rounded-xl "
              >
                <span className="font-sans font-bold"> Home</span>
              </button>
              <button
                className="lnr lnr-alarm text-5xl w-full bg-sky-500 text-white hover:text-cyan-200 transition-all duration-200 
               py-3 px-1 rounded-xl "
              >
                <span className="font-sans font-bold"> Notifications</span>
              </button>
              <button
                className="lnr lnr-cog text-5xl w-full bg-sky-500 text-white hover:text-cyan-200 transition-all duration-200 
               py-3 px-1 rounded-xl"
              >
                <span className="font-sans font-bold"> Settings</span>
              </button>
              <button
                className="lnr lnr-user text-5xl w-full bg-sky-500 text-white hover:text-cyan-200 transition-all duration-200 
               py-3 px-1 rounded-xl"
              >
                <span className="font-sans font-bold"> User</span>
              </button>
            </div>
          </div>
        )}

        {/* Mobile NavBar */}

        <div className="justify-between items-center mr-10 space-x-10 hidden sm:flex">
          <button className="w-32 h-16 rounded-2xl text-2xl font-sans font-bold bg-white shadow-md hover:bg-cyan-100 transition-all duration-200">
            Log In
          </button>
          <button className="w-32 h-16 rounded-2xl text-2xl font-sans font-bold bg-white shadow-md hover:bg-cyan-100 transition-all duration-200">
            Sign Up
          </button>
        </div>
        <div className="justify-between items-center mr-10 space-x-10 sm:hidden hidden ">
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
