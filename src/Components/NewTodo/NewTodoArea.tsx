import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { fireStoredb } from "../../Config/firebase";
import useLoadFromDb, { Todo } from "../Calender/UseLoadFromDb";

import NewStep from "./NewStep";

type NewTodoAreaProps = {
  isFullScreen?: boolean;
  setIsFullScreen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewTodoArea = (props: NewTodoAreaProps) => {
  const [isCheck, setIsCheck] = useState(false);
  const [steps, setSteps] = useState<string[]>([""]);

  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [reminderDate, setReminderDate] = useState<string>("");
  const [reminderTime, setReminderTime] = useState<string>("");
  const [selectedRadio, setSelectedRadio] = useState<string | null>(null);

  const [priority, setPriority] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [successAdded, setSuccessAdded] = useState(false);
  const [notSuccess, setNotsuccess] = useState(false);

  const handleRadioClick = (value: string) => {
    if (selectedRadio === value) {
      setSelectedRadio(null);
    } else {
      setSelectedRadio(value);
    }
  };

  const checkHandler = () => {
    setIsCheck(!isCheck);
    setSteps([""]);
  };

  const handleSubmit = () => {
    const reminderDateTime = `${reminderDate}T${reminderTime}:00.000Z`;
    const filteredSteps = steps.filter((step) => step.trim() !== "");

    const todo = {
      userId: userId,
      title: title,
      dueDate: dueDate,
      priority: priority,
      steps: filteredSteps,
      reminderTime: reminderTime,
      reminderDate: reminderDate,
      periodic: selectedRadio,
      reminderDateTime: reminderDateTime,
    };

    if (!title || !dueDate || !priority) {
      setNotsuccess(true);
      setSuccessAdded(false);
      return;
    }

    addTodo(todo)
      .then(() => {
        setTitle("");
        setDueDate("");
        setPriority("");
        setSteps([""]);
        setReminderDate("");
        setReminderTime("");
        setSelectedRadio(null);
        setIsCheck(false);
        setSuccessAdded(true);
        setNotsuccess(false);
      })
      .catch(() => {
        setNotsuccess(true);
        setSuccessAdded(false);
      });
  };

  interface Todo {
    userId: string | null;
    title: string;
    dueDate: string;
    priority: string;
    steps: string[];
    reminderTime: string;
    reminderDate: string;
    periodic: string | null;
    reminderDateTime: string;
  }

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const addTodo = async (todo: Todo) => {
    try {
      const docRef = await addDoc(collection(fireStoredb, "todos"), {
        ...todo,
      });

      setSuccessAdded(true);
      setNotsuccess(false);
    } catch (e: any) {
      console.error("Error adding todo:", e.message);
      setNotsuccess(true);
      setSuccessAdded(false);
    }
  };

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

  return (
    <div
      className={`${
        !props.isFullScreen
          ? "pt-10 w-[35rem] sm:w-[40rem] md:w-[50rem] xl:w-[60rem] rounded-xl flex flex-col justify-center items-start p-10"
          : "2xl:max-w-[50rem] w-full 2xl:max-h-[76rem] p-10 rounded-lg 2xl:overflow-y-auto hidden 2xl:block"
      } bg-white pb-10`}
    >
      <h1 className="xl:block text-5xl self-center pt-5 font-bold">New Todo</h1>

      <div className="mt-20 mx-auto w-[100%] flex items-center justify-center">
        <span className=" w-[14rem] 2xl:w-[16rem] md:w-[17rem] font-bold text-2xl sm:text-4xl">
          Todo Title :
        </span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xl sm:text-2xl w-96 md:w-[33rem]  border-2 p-5 py-5  border-cyan-200 shadow-sm focus:outline-2 outline-sky-500"
          type="text"
          placeholder="Todo Title"
        />
      </div>
      <div className="mt-10 mx-auto w-[100%] flex items-center justify-center">
        <span className="w-[14rem] 2xl:w-[16rem] font-bold text-2xl sm:text-4xl md:w-[17rem]">
          Due Date :
        </span>
        <input
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className=" text-xl sm:text-2xl  w-96 md:w-[33rem]  border-2 p-5 py-5  border-cyan-200 shadow-sm focus:outline-2 outline-sky-500"
          type="date"
          min={formattedDate}
        />
      </div>
      <div className="mt-10 mx-auto w-[100%] flex items-center justify-center space-x-10">
        <span className="w-[11rem] sm:w-[14rem] md:w-[20rem] font-bold text-2xl 2xl:w-[17rem] sm:text-4xl whitespace-nowrap">
          Priority Level :
        </span>
        <div className="flex items-center justify-center relative">
          <span className="w-72 sm:w-33 2xl:w-80 rounded-full h-2 bg-sky-500 relative">
            &nbsp;
          </span>
          <input
            onChange={(e) => setPriority(e.target.value)}
            className="text-2xl border-2 p-10 py-5  border-cyan-200 absolute left-1 top-50 cursor-pointer after:contents"
            type="radio"
            name="priority"
            value="low"
          />
          <span className="absolute -left-2 top-7 text-center text-2xl">
            {" "}
            Low
          </span>
          <input
            onChange={(e) => setPriority(e.target.value)}
            className="text-2xl border-2 p-10 py-5  border-cyan-200 absolute cursor-pointer"
            type="radio"
            name="priority"
            value="medium"
          />
          <span className="absolute left-50 top-7 text-center text-2xl">
            {" "}
            Medium
          </span>
          <input
            onChange={(e) => setPriority(e.target.value)}
            className="text-2xl border-2 p-10 py-5  border-cyan-200 absolute right-1 top-50 cursor-pointer"
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
      <div className="mt-20 mx-auto w-[100%] flex items-center justify-center space-x-10">
        <span className="w-[11rem]  sm:w-[14rem] 2xl:w-[13rem] font-bold text-2xl sm:text-4xl whitespace-nowrap ">
          Reminder :
        </span>
        <div className="flex items-center">
          <input
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            className="mr-2 h-16 border-2 p-5 md:w-[12rem]  border-cyan-200 shadow-sm focus:outline-2 outline-sky-500 text-xl sm:text-2xl"
            type="time"
          />
          <input
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
            className=" border-2 h-16  md:w-[12rem]  border-cyan-200 shadow-sm focus:outline-2 outline-sky-500 text-xl sm:text-2xl"
            type="date"
          />
        </div>
      </div>
      {/* <div className="mt-10 flex items-center">
        <span className="ml-5 w-[16rem] font-bold text-2xl sm:text-4xl">
          Periodic :
        </span>
        <div className="w-32 grid grid-cols-2 md:grid-cols-4 gap-x-36 space-y-2">
          <div className="flex items-center space-x-3">
            <input
              checked={selectedRadio === "daily"}
              onClick={() => handleRadioClick("daily")}
              className="text-xl sm:text-2xl border-2 p-5 py-5 w-7 h-7  border-cyan-200 shadow-sm focus:outline-2 outline-sky-500"
              type="radio"
              name="periodic"
            />
            <span className="text-2xl">Daily</span>
          </div>
          <div className="flex items-center space-x-3">
            <input
              checked={selectedRadio === "weekly"}
              onClick={() => handleRadioClick("weekly")}
              className="text-xl sm:text-2xl border-2 p-5 py-5 w-7 h-7  border-cyan-200 shadow-sm focus:outline-2 outline-sky-500"
              type="radio"
              name="periodic"
            />
            <span className="text-2xl">Weekly</span>
          </div>
          <div className="flex items-center space-x-3">
            <input
              checked={selectedRadio === "monthly"}
              onClick={() => handleRadioClick("monthly")}
              className="text-xl sm:text-2xl border-2 p-5 py-5 w-7 h-7  border-cyan-200 shadow-sm focus:outline-2 outline-sky-500"
              type="radio"
              name="periodic"
            />
            <span className="text-2xl">Monthly</span>
          </div>
          <div className="flex items-center space-x-3">
            <input
              checked={selectedRadio === "yearly"}
              onClick={() => handleRadioClick("yearly")}
              className="text-xl sm:text-2xl border-2 p-5 py-5 w-7 h-7  border-cyan-200 shadow-sm focus:outline-2 outline-sky-500"
              type="radio"
              name="periodic"
            />
            <span className="text-2xl">Yearly</span>
          </div>
        </div>
      </div> */}
      <div className="flex justify-center items-center space-x-2 mt-20 self-center">
        <input
          onClick={checkHandler}
          className="w-10 h-10"
          type="checkbox"
          id="progress"
        />
        <label className=" font-sans text-2xl sm:text-2xl" htmlFor="progress">
          If you have steps please check.
        </label>
      </div>

      <div className="self-center">
        {isCheck && (
          <div className="flex justify-center pt-10 flex-col">
            <span className="text-center font-sans font-bold text-2xl self-center">
              Press enter after each step
            </span>
            <NewStep steps={steps} setSteps={setSteps} />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-center mt-16 self-center w-full">
        <button
          onClick={handleSubmit}
          className="w-[90%] h-16 py-4 px-20 text-4xl bg-sky-500 text-white font-sans font-bold rounded-lg shadow-md hover:bg-cyan-800 duration-150 transition-bg"
        >
          Add Todo
        </button>
        {successAdded && (
          <span className="mt-10 text-2xl w-full text-center font-bold text-green-500">
            Todo added
          </span>
        )}

        {notSuccess && (
          <span className="mt-10 text-2xl w-full text-center font-bold text-red-500">
            Please fill in all requirements
          </span>
        )}
      </div>
    </div>
  );
};

export default NewTodoArea;
