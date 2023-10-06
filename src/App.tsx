import React, { useState } from "react";
import "./App.css";
import YearView from "./Components/Calender/YearView";
import NavBar from "./Components/NavBar/Navbar";
import NewTodo from "./Components/NewTodo/NewTodo";
import NewTodoArea from "./Components/NewTodo/NewTodoArea";
import "./firebase";

function App() {
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setTimeout(() => {
      setIsLoggedIn(true);
    }, 1500);
  };

  return (
    <div>
      <NavBar
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
        onLoginSuccess={handleLoginSuccess}
      />
      <div className="flex justify-center  xl:space-x-64 ">
        <div>
          <NewTodo />
          <YearView />
        </div>
        <NewTodoArea
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
        />
      </div>
    </div>
  );
}

export default App;
