import React, { useState } from "react";
import NewTodoArea from "./NewTodoArea";

const NewTodo = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div className="pt-10 2xl:hidden flex flex-col justify-center items-center space-y-10">
      <div className="mx-auto flex  items-center space-x-10 ">
        {/* <button className="lnr lnr-arrow-left text-7xl font-bold hover:text-sky-500 duration-150"></button> */}
        <button
          className="bg-sky-500 py-6 px-40 text-4xl font-bold text-white rounded-3xl shadow-xl"
          onClick={() => setIsFullScreen(!isFullScreen)}
        >
          Add New Todo
        </button>
        {/* <button className="lnr lnr-arrow-right text-7xl font-bold hover:text-sky-500 duration-150"></button> */}
      </div>
      <NewTodoArea
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
      />
    </div>
  );
};

export default NewTodo;
