import React, { useState } from "react";
import NewTodoArea from "./NewTodoArea";

const NewTodo = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const AddTodoClickHandler = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="pt-10 2xl:hidden flex flex-col justify-center items-center space-y-10">
      <div className="mx-auto flex  items-center space-x-10 ">
        <button
          className="bg-sky-500 py-6 px-40 text-4xl font-bold text-white rounded-3xl shadow-xl"
          onClick={() => {
            AddTodoClickHandler();
            setIsFullScreen(!isFullScreen);
          }}
        >
          {!isClicked ? "Close Todo Tab" : "Add New Todo"}
        </button>
      </div>

      <NewTodoArea
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
      />
    </div>
  );
};

export default NewTodo;
