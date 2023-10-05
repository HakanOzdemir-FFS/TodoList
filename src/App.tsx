import React, { useState } from "react";
import "./App.css";
import MonthView from "./Components/Calender/MonthView";
import NavBar from "./Components/NavBar/Navbar";
import NewTodo from "./Components/NewTodo/NewTodo";
import NewTodoArea from "./Components/NewTodo/NewTodoArea";

function App() {
  const [isFullScreen, setIsFullScreen] = useState(true);
  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-center xl:space-x-64 ">
        <div>
          <NewTodo />
          <MonthView />
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
