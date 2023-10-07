import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { fireStoredb } from "../../Config/firebase";

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
  const [priority, setPriority] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [successAdded, setSuccessAdded] = useState(false);
  const [notSuccess, setNotsuccess] = useState(false);

  const checkHandler = () => {
    if (isCheck) {
      setIsCheck(false);
    } else {
      setIsCheck(true);
    }
  };

  const handleSubmit = () => {
    const todo = {
      userId: userId,
      title: title,
      dueDate: dueDate,
      priority: priority,
      steps: steps,
    };
    setTitle("");
    setDueDate("");
    setPriority("");
    setSteps([""]);

    if (!title || !dueDate || !priority) {
      setNotsuccess(true);
      return;
    }

    addTodo(todo);
  };

  interface Todo {
    userId: string | null;
    title: string;
    dueDate: string;
    priority: string;
    steps: string[];
  }

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
  }, []);

  const addTodo = async (todo: Todo) => {
    try {
      const docRef = await addDoc(collection(fireStoredb, "todos"), {
        userId: todo.userId,
        title: todo.title,
        dueDate: todo.dueDate,
        priority: todo.priority,
        steps: todo.steps,
      });

      setSuccessAdded(true);
      setNotsuccess(false);
    } catch (e) {
      setNotsuccess(true);
      setSuccessAdded(false); //Bu neden çalışmıyor bilmiyorum
      console.error("Error adding todo: ", e);
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
          ? "pt-10 mx-auto block rounded-md"
          : "2xl:max-w-[50rem] w-full 2xl:max-h-[76rem] p-10 rounded-lg 2xl:overflow-y-auto hidden 2xl:block"
      } bg-white pb-10`}
    >
      <h1 className="xl:block text-5xl text-center pt-5 font-bold">New Todo</h1>

      <div className="m-10 mt-20 flex items-center">
        <span className="w-[16rem] font-bold text-3xl sm:text-4xl">
          Todo Title :
        </span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xl sm:text-3xl  border-2 p-5 py-5  border-cyan-200 shadow-sm focus:outline-2 outline-sky-500"
          type="text"
          placeholder="Todo Title"
        />
      </div>
      <div className="m-10 mt-10 flex items-center">
        <span className="w-[16rem] font-bold text-3xl sm:text-4xl">
          Due Date :
        </span>
        <input
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className=" border-2 p-10 py-5  border-cyan-200 shadow-sm focus:outline-2 outline-sky-500 text-xl sm:text-3xl"
          type="date"
          placeholder="Todo Title"
          min={formattedDate}
        />
      </div>
      <div className="m-10 mt-10 flex items-center">
        <span className="w-[16rem] font-bold text-3xl sm:text-4xl">
          Priority Level :
        </span>
        <div className="flex items-center justify-center relative">
          <span className="w-52 2xl:w-80 rounded-full h-2 bg-sky-500 relative">
            &nbsp;
          </span>
          <input
            onChange={(e) => setPriority(e.target.value)}
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
            onChange={(e) => setPriority(e.target.value)}
            className="text-3xl border-2 p-10 py-5  border-cyan-200 absolute cursor-pointer"
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
        <label className="text-xl sm:text-3xl" htmlFor="progress">
          If you have steps please check.
        </label>
      </div>

      <div>
        {isCheck && (
          <div className="flex justify-center pt-10 flex-col">
            <span className="text-center font-sans font-bold text-2xl">
              Press enter after each step
            </span>
            <NewStep steps={steps} setSteps={setSteps} />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-center mt-16">
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
