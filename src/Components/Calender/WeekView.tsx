import React, { useState } from "react";

import DayView from "./DayView";
import { spawn } from "child_process";

type Todo = {
  dueDate: string;
  priority: string;
  steps: string[];
  title: string;
  userId: string;
};

type WeekViewProps = {
  selectedMonthName: string;
  selectedYear: number;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number | null>>;
  loggedUserId: string;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
};

const WeekView: React.FC<WeekViewProps> = ({
  selectedMonthName,
  selectedYear,
  setSelectedMonth,
  loggedUserId,
  todos,
  setTodos,
}) => {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const Weeks = ["1st Week of", "2nd Week of", "3rd Week of", "4th Week of"];

  const handleWeekClick = (index: number) => () => {
    setSelectedWeek(index);
  };

  if (selectedWeek !== null) {
    return (
      <DayView
        todos={todos}
        setTodos={setTodos}
        selectedYear={selectedYear}
        selectedMonthName={selectedMonthName}
        selectedWeek={Weeks[selectedWeek]}
        setSelectedWeek={setSelectedWeek}
      />
    );
  }

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-emerald-500";
      case "medium":
        return "bg-sky-400";
      case "high":
        return "bg-rose-500";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-10 pt-10 ">
      <div
        className="text-center py-4 text-2xl text-white uppercase font-bold mb-10 w-full bg-rose-500 border rounded-md cursor-pointer"
        onClick={() => setSelectedMonth(null)}
      >
        Click back to <br /> Year
      </div>
      <h1 className="text-white font-bold font-sans text-5xl text-center mb-5">
        {`${selectedMonthName} of ${selectedYear}`}
      </h1>
      <div className="pt-0 w-[100%]">
        <ul className="grid grid-cols-1">
          {Weeks.map((week, index) => {
            const todosForWeek = todos.filter((todo) => {
              const dayOfMonth = new Date(todo.dueDate).getDate();
              const weekStart = index * 7 + 1;
              const weekEnd = (index + 1) * 7;
              return dayOfMonth >= weekStart && dayOfMonth <= weekEnd;
            });

            return (
              <li
                key={index}
                className="list-none md:w-full border-2 mb-5 border-transparent hover:border-2 hover:border-cyan-500 cursor-pointer "
                onClick={handleWeekClick(index)}
              >
                <div className="w-full 2xl:w-[52rem] h-96 border bg-white rounded-md relative hide-scrollbar flex pt-6 overflow-auto">
                  <span className="absolute top-1 left-1">{week}</span>
                  <div className="font-sans text-2xl rounded-full  flex flex-col first-letter:capitalize p-4 space-y-2 ">
                    {todosForWeek.map(
                      ({ title, dueDate, priority }, todoIndex) => {
                        const priorityClass = getPriorityClass(priority);

                        return (
                          <div
                            className={`w-[40rem] py-4 text-white  first-letter-capitalize flex rounded-md justify-center ${priorityClass}`}
                            key={todoIndex}
                          >
                            <span className="fons-sans pl-4 w-[50%]">
                              {title}
                            </span>
                            <span className="px-4"> {"=>"}</span>
                            <span className="pr-4 w-[25%]">{dueDate}</span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default WeekView;
