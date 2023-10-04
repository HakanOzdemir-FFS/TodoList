import { stringify } from "querystring";
import React, { useState } from "react";

import NewStep from "./NewStep";

const NewTodoArea = () => {
  const [isCheck, setIsCheck] = useState(false);

  const checkHandler = () => {
    if (isCheck) {
      setIsCheck(false);
    } else {
      setIsCheck(true);
    }
    console.log(isCheck);
  };

  return (
    <div className="2xl:w-[50rem] 2xl:h-[76rem] 2xl:bg-white rounded-lg 2xl:overflow-y-auto 2xl:pb-10 hidden 2xl:block">
      <h1 className="hidden xl:block text-5xl text-center pt-5 font-bold">
        New Todo
      </h1>

      <div className="m-10 mt-20 flex items-center">
        <span className="w-[16rem] font-bold text-4xl">Todo Title :</span>
        <input
          className="text-3xl border-2 p-10 py-5  border-cyan-200 shadow-sm focus:outline-2 outline-sky-500"
          type="text"
          placeholder="Todo Title"
        />
      </div>
      <div className="m-10 mt-10 flex items-center">
        <span className="w-[16rem] font-bold text-4xl">Due Date :</span>
        <input
          className="text-3xl border-2 p-10 py-5  border-cyan-200 shadow-sm focus:outline-2 outline-sky-500"
          type="date"
          placeholder="Todo Title"
        />
      </div>
      <div className="m-10 mt-10 flex items-center">
        <span className="w-[16rem] font-bold text-4xl">Priority Level :</span>
        <div className="flex items-center justify-center relative">
          <span className="w-80 rounded-full h-2 bg-sky-500 relative">&nbsp;</span>
          <input
            className="text-3xl border-2 p-10 py-5  border-cyan-200 absolute left-1 top-50 cursor-pointer after:contents"
            type="radio"
            name="priority"
            value="low"
          />
          <span className="absolute -left-2 top-7 text-center text-2xl">
            {" "}
            Low
          </span>
          <input
            className="text-3xl border-2 p-10 py-5  border-cyan-200 absolute cursor-pointer"
            type="radio"
            name="priority"
            value="medium"
          />
          <span className="absolute left-28 top-7 text-center text-2xl">
            {" "}
            Medium
          </span>
          <input
            className="text-3xl border-2 p-10 py-5  border-cyan-200 absolute right-1 top-50 cursor-pointer"
            type="radio"
            name="priority"
            value="high"
          />
          <span className="absolute -right-2 top-7 text-center text-2xl">
            {" "}
            High
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-2 mt-20">
        <input
          onClick={checkHandler}
          className="w-10 h-10"
          type="checkbox"
          id="progress"
        />
        <label className="text-4xl" htmlFor="progress">
          If you have steps please check.
        </label>
      </div>
      <div>{isCheck && <NewStep />}</div>
      <div className="flex justify-center items-center mt-16">
        <button className="w-[90%] h-16 py-4 px-20 text-4xl bg-sky-500 text-white font-sans font-bold rounded-lg shadow-md hover:bg-cyan-800 duration-150 transition-bg">
          Add Todo
        </button>
      </div>
    </div>
  );
};

export default NewTodoArea;
