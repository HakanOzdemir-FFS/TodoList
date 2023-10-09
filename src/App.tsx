import React, { useState } from "react";
import "./App.css";
import YearView from "./Components/Calender/YearView";
import NavBar from "./Components/NavBar/Navbar";
import NewTodo from "./Components/NewTodo/NewTodo";
import NewTodoArea from "./Components/NewTodo/NewTodoArea";
import "./Config/firebase";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import Footer from "./Components/WelcomePage/Footer";

function App() {
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState<string>("");

  const handleLoginSuccess = () => {
    setTimeout(() => {
      setIsLoggedIn(true);
    }, 1500);
  };

  return (
    <div>
      <NavBar
        setLoggedUserId={setLoggedUserId}
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
        onLoginSuccess={handleLoginSuccess}
        loggedUserId={loggedUserId}
      />
      {!isLoggedIn ? (
        <WelcomePage />
      ) : (
        <div className="flex justify-center  xl:space-x-64 mt-32 mb-32">
          <div className="w-[50rem]">
            <NewTodo />
            <YearView loggedUserId={loggedUserId} />
          </div>
          <NewTodoArea
            isFullScreen={isFullScreen}
            setIsFullScreen={setIsFullScreen}
          />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
