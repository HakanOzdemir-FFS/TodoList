import React, { useRef, useEffect, useState } from "react";
import useLoadFromDb, { Todo } from "./UseLoadFromDb";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { fireStoredb } from "../../Config/firebase";

type DayViewProps = {
  selectedMonthName: string;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
  selectedMonthIndex: number;
  selectedYear: number;
  setSelectedDay: React.Dispatch<React.SetStateAction<number | null>>;
  selectedDay: number;
};

const DayView: React.FC<DayViewProps> = ({
  selectedMonthIndex,
  todos,
  setTodos,
  selectedMonthName,
  selectedYear,
  setSelectedDay,
  selectedDay,
}) => {
  const [activeTodoIndex, setActiveTodoIndex] = useState<number | null>(null);
  const [widths, setWidths] = useState<string[]>([]);
  const todosRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const isStepCompleted = (step: any) => {
    if (typeof step === "object" && step.completed) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setWidths(
      todos.map((_, index) => {
        const el = todosRefs.current[index];
        return el ? el.innerText : "0%";
      })
    );
  }, [todos]);

  const chackhedTodoHandler = (todoId: string) => {
    const currentTodo = todos.find((todo) => todo.id === todoId);
    if (!currentTodo) return;

    const completedStepsCount = currentTodo.steps.filter(
      (step) => typeof step === "object" && step.completed
    ).length;

    const totalSteps = currentTodo.steps.length;

    if (completedStepsCount === totalSteps) {
      currentTodo.percentage = "100%";
    } else {
      const percentage = Math.round((completedStepsCount / totalSteps) * 100);
      currentTodo.percentage = `${percentage}%`;
    }

    setTodos([...todos]);
  };

  const handleTodoClick = (index: number) => {
    if (activeTodoIndex === index) {
      setActiveTodoIndex(null);
    } else {
      setActiveTodoIndex(index);
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-emerald-500";
      case "medium":
        return "bg-sky-500";
      case "high":
        return "bg-rose-500";
      default:
        return "";
    }
  };

  const todosForTheDay = todos.filter((todo) => {
    const todoDate = new Date(todo.dueDate);
    return (
      todoDate.getDate() === selectedDay &&
      todoDate.getMonth() === selectedMonthIndex &&
      todoDate.getFullYear() === selectedYear
    );
  });

  const toggleStepCompletion = async (
    todoId: number | string,
    stepIndex: number
  ) => {
    if (!todoId) return;

    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex === -1) return;

    const updatedTodos = [...todos];
    const currentTodo = updatedTodos[todoIndex];
    const currentStep = currentTodo.steps[stepIndex];

    if (typeof currentStep === "object") {
      currentStep.completed = !currentStep.completed;
    } else {
      currentTodo.steps[stepIndex] = {
        text: currentStep,
        completed: true,
      };
    }

    const completedStepsCount = currentTodo.steps.filter(
      (step) => typeof step === "object" && step.completed
    ).length;

    const percentage = Math.round(
      (completedStepsCount / currentTodo.steps.length) * 100
    );
    currentTodo.percentage = `${percentage}%`;

    updatedTodos[todoIndex] = currentTodo;
    setTodos(updatedTodos);

    try {
      if (!currentTodo.id) {
        console.error("Todo ID is undefined");
        return;
      }
      const todoRef = doc(fireStoredb, "todos", currentTodo.id);

      await updateDoc(todoRef, {
        steps: currentTodo.steps,
        percentage: currentTodo.percentage,
      });
    } catch (error) {
      console.error("Error updating todo in Firestore: ", error);
    }
  };

  const prevDay = () => {
    setSelectedDay(selectedDay - 1);
  };
  const nextDay = () => {
    setSelectedDay(selectedDay + 1);
  };

  const deleteTodo = async (todoId: string) => {
    const todoRef = doc(fireStoredb, "todos", todoId);
    try {
      await deleteDoc(todoRef);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div>
      <div
        className="text-center py-4 text-2xl text-white uppercase font-bold my-10 w-full bg-rose-500 border rounded-md cursor-pointer"
        onClick={() => setSelectedDay(null)}
      >
        Click back to <br /> Calender
      </div>
      <div className="flex w-full">
        <div className="flex justify-center w-full space-x-5 ">
          <div
            className="bg-stone-800 rounded-lg flex-col space-y-3 p-2 flex  cursor-pointer"
            onClick={prevDay}
          >
            <button className="lnr lnr-arrow-left text-white font-bold text-6xl"></button>
            <span className="text-white text-xl font-sans">
              {selectedDay - 1} {selectedMonthName}
            </span>
          </div>
          <div
            className="bg-stone-800 rounded-lg flex-col space-y-3 p-2 flex  cursor-pointer"
            onClick={nextDay}
          >
            <button className="lnr lnr-arrow-right text-white font-bold text-6xl"></button>
            <span className="text-white text-xl font-sans">
              {selectedDay + 1} {selectedMonthName}
            </span>
          </div>
        </div>
      </div>
      <div className="max-w-full  bg-gray-200 p-6 rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold text-white bg-stone-900 rounded-lg mb-4 py-4 text-center">
          {` ${selectedMonthName} ${selectedDay}, ${selectedYear}`} - Todo List
        </h2>
        <ul className="space-y-4">
          {todosForTheDay.map((todo, index) => (
            <li key={index}>
              <div
                className={`flex justify-between items-center p-3 rounded-md shadow-sm ${getPriorityClass(
                  todo.priority
                )}`}
                onClick={() => handleTodoClick(index)}
              >
                <span id={todo.id} className="text-2xl text-white">
                  {todo.title}
                </span>

                <div className="flex items-center space-x-10">
                  <div className="flex items-center space-x-3">
                    <span className="text-white font-sans text-lg">
                      {todo.percentage ? todo.percentage : "0%"}
                    </span>
                    <div
                      key={index}
                      className="relative  h-4 w-32 bg-gray-300 rounded"
                    >
                      <div
                        style={{ width: todo.percentage || "0%" }}
                        className="absolute h-4 bg-green-500 rounded"
                      ></div>
                    </div>
                  </div>

                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-rose-400 hover:bg-rose-600 p-2 rounded text-white text-2xl flex space-x-2 items-center justify-center cursor-pointer"
                  >
                    <span className="lnr lnr-trash"></span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (todo.id) {
                          deleteTodo(todo.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <div>
                {index === activeTodoIndex && (
                  <div className="mt-5 pb-10 max-h-[20rem] overflow-y-auto flex flex-col space-y-2 text-2xl">
                    {todo.steps.length === 0 ? (
                      <div className="step text-black flex space-x-2 items-center overflow-y-auto">
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            if (todo.id) {
                              toggleStepCompletion(todo.id, 0);
                            }
                          }}
                          className={`lnr lnr-checkmark-circle text-3xl text-black font-bold ${
                            isStepCompleted(todo.steps[0])
                              ? "bg-emerald-400"
                              : "hover:bg-emerald-400"
                          } duration-200 rounded-full cursor-pointer`}
                        ></span>
                        <span className="w-full py-4 bg-stone-700 text-white px-4 rounded-lg">
                          Complate Your Todo
                        </span>
                      </div>
                    ) : (
                      todo.steps.map((step, stepIndex) => {
                        const stepText =
                          typeof step === "object" ? step.text : step;

                        return (
                          <div key={stepIndex} className="step text-black">
                            <label className="flex items-center space-x-2">
                              <div>
                                <span
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (todo.id) {
                                      toggleStepCompletion(todo.id, stepIndex);
                                    }
                                  }}
                                  className={`lnr lnr-checkmark-circle text-3xl text-black font-bold ${
                                    isStepCompleted(todo.steps[stepIndex])
                                      ? "bg-emerald-400"
                                      : "hover:bg-emerald-400"
                                  } duration-200 rounded-full cursor-pointer`}
                                ></span>
                              </div>
                              <span className="w-full py-4 bg-stone-700 text-white px-4 rounded-lg">
                                {stepText}
                              </span>
                            </label>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DayView;
