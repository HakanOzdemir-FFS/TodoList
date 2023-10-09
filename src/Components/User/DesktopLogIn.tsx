import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

interface DesktopLogInProps {
  desktopView: string;
  setDesktopView: React.Dispatch<React.SetStateAction<string>>;
  onLoginSuccess: () => void;
  setLoggedUserId: React.Dispatch<React.SetStateAction<string>>;
}
const DesktopLogIn: React.FC<DesktopLogInProps> = (
  props: DesktopLogInProps
) => {
  const [isClicked, setIsClicked] = useState(true);

  const handleClose = () => {
    props.setDesktopView("");
  };
  
  const preventPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`w-screen h-screen fixed top-0 -left-10 right-0 flex justify-center items-center bg-opacity-80 bg-gray-900 z-50 ${
        isClicked ? "" : "hidden"
      }`}
      onClick={handleClose}
    >
      <div className="bg-white p-32 relative" onClick={preventPropagation}>
        {props.desktopView === "login" && (
          <Login  setLoggedUserId={props.setLoggedUserId} onLoginSuccess={props.onLoginSuccess} />
        )}
        {props.desktopView === "signUp" && <SignUp />}
        <span
          className="lnr lnr-cross text-5xl absolute top-4 right-5 cursor-pointer"
          onClick={handleClose}
        ></span>
      </div>
    </div>
  );
};

export default DesktopLogIn;
