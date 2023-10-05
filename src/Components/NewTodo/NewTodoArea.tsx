import React, { useState } from "react";

import NewStep from "./NewStep";

type NewTodoAreaProps = {
  isFullScreen?: boolean;
  setIsFullScreen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewTodoArea = (props: NewTodoAreaProps) => {
  const [isCheck, setIsCheck] = useState(false);

  const checkHandler = () => {
    if (isCheck) {
      setIsCheck(false);
    } else {
      setIsCheck(true);
    }
  };

  return (
    <div
      className={`${
        !props.isFullScreen
          ? "pt-10 block"
          : "2xl:max-w-[50rem] 2xl:max-h-[76rem] p-10 rounded-lg 2xl:overflow-y-auto hidden 2xl:block"
      } bg-white pb-10`}
    >
      <h1 className="xl:block text-5xl text-center pt-5 font-bold">New Todo</h1>

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
          <span className="w-80 rounded-full h-2 bg-sky-500 relative">
            &nbsp;
          </span>
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
