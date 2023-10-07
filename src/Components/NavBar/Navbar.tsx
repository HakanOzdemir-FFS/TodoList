import React, { useState, useEffect } from "react";
import Login from "../User/Login";
import SignUp from "../User/SignUp";
import DesktopLogIn from "../User/DesktopLogIn";
import { getAuth, signOut } from "firebase/auth";
import DarkMode from "./DarkMode";

interface NavBarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  onLoginSuccess: () => void;
  setLoggedUserId: React.Dispatch<React.SetStateAction<string>>;
}

const NavBar: React.FC<NavBarProps> = ({
  isLoggedIn,
  onLoginSuccess,
  setIsLoggedIn,
  setLoggedUserId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animationName, setAnimationName] = useState("");
  const [view, setView] = useState("");
  const [desktopView, setDesktopView] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("Successfully signed out!");
      setShowDropdown(false);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

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

  const logInClickHandler = () => {
    setDesktopView("login");
  };

  const signUpClickHandler = () => {
    setDesktopView("signUp");
  };

  const userIconHandler = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="w-full z-50 h-32 bg-sky-500 fixed top-0 left-0">
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

        {/* Mobile NavBar Open*/}
        <button
          onClick={navBarHandler}
          className={`w-24 h-24 mr-5 my-auto fixed top-2 right-2 rounded-full flex flex-col justify-center items-center space-y-2 sm:hidden z-20 ${
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

            {!isLoggedIn ? (
              <div className="w-[90%] justify-center mt-10 mx-auto flex flex-col items-center space-y-5 z-20">
                {view !== "login" && (
                  <div className="w-[100%]">
                    <button
                      onClick={() => setView("login")}
                      className="h-20 w-[100%] rounded-2xl text-5xl font-sans font-bold bg-sky-500 self-stretch
          text-white shadow-md"
                    >
                      Log In
                    </button>
                    <p className="pt-5 font-sans text-center text-3xl text-stone-400">
                      If you have an account: Log In
                    </p>
                  </div>
                )}

                {view !== "signUp" && (
                  <div className="w-[100%]">
                    <button
                      onClick={() => setView("signUp")}
                      className="h-20 w-[100%] rounded-2xl text-5xl font-sans font-bold bg-sky-500 self-stretch
          text-white shadow-md"
                    >
                      Sign Up
                    </button>
                    <p className="pt-5 font-sans text-center text-3xl text-stone-400">
                      If you don't have an account: Sign Up
                    </p>
                  </div>
                )}

                {view === "login" && (
                  <Login
                    setLoggedUserId={setLoggedUserId}
                    onLoginSuccess={onLoginSuccess}
                  />
                )}
                {view === "signUp" && <SignUp />}
              </div>
            ) : (
              <div className="w-[90%] mt-10 mx-auto flex-col space-y-5 z-20">
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
                  <span className="font-sans font-bold "> User</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="lnr lnr-exit text-5xl w-full bg-rose-500 text-white hover:text-cyan-200 transition-all duration-200 
               py-3 px-1 rounded-xl"
                >
                  <span className="font-sans font-bold "> Log Out</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile NavBar End*/}

        {!isLoggedIn ? (
          <div className="justify-between items-center mr-10 space-x-10 hidden sm:flex">
            <DarkMode />
            <button
              onClick={logInClickHandler}
              className="w-32 h-16 rounded-2xl text-2xl font-sans font-bold bg-white shadow-md hover:bg-cyan-100 transition-all duration-200"
            >
              Log In
            </button>
            {desktopView && (
              <DesktopLogIn
                setLoggedUserId={setLoggedUserId}
                desktopView={desktopView}
                setDesktopView={setDesktopView}
                onLoginSuccess={onLoginSuccess}
              />
            )}
            <button
              onClick={signUpClickHandler}
              className="w-32 h-16 rounded-2xl text-2xl font-sans font-bold bg-white shadow-md hover:bg-cyan-100 transition-all duration-200"
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div className="justify-between items-center mr-10 space-x-10 hidden sm:flex relative">
            <DarkMode />
            <button className="lnr lnr-alarm text-5xl text-white hover:text-cyan-200 transition-all duration-200"></button>
            <button className="lnr lnr-cog text-5xl text-white hover:text-cyan-200 transition-all duration-200"></button>
            <button
              onClick={userIconHandler}
              className="lnr lnr-user text-5xl text-white hover:text-cyan-200 transition-all duration-200"
            ></button>
            {showDropdown && (
              <div className="absolute text-white py-2 px-8 bg-rose-500 rounded-md top-[180%]   -right-10 z-10 border border-white flex items-center space-x-5 hover:bg-rose-700 duration-150">
                <button
                  className="text-2xl font-bold flex items-center space-x-5"
                  onClick={handleLogout}
                >
                  <span className="lnr lnr-exit text-4xl"></span>
                  <span> Log Out</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
