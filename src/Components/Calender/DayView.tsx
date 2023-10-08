import React, { useState } from "react";

type Todo = {
  dueDate: string;
  priority: string;
  steps: string[];
  title: string;
  userId: string;
};

type DayViewProps = {
  selectedMonthName: string;
  setSelectedWeek: React.Dispatch<React.SetStateAction<number | null>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
  clickedYear: number;
  selectedMonthIndex: number;
  selectedWeek: number;
};

const DayView: React.FC<DayViewProps> = ({
  selectedMonthIndex,
  clickedYear,
  todos,
  setTodos,
  setSelectedWeek,
  selectedMonthName,
  selectedWeek,
}) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const Day = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const clickDayHandler = (index: number) => {
    setSelectedDay(index);
  };

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

  function getAdjustedDayOfWeek(date: Date): number {
    let day = date.getDay();
    if (day === 0) {
      return 6;
    } else {
      return day - 1;
    }
  }

  const firstDayOfMonth = new Date(clickedYear, selectedMonthIndex, 1);
  const adjustedFirstDay = getAdjustedDayOfWeek(firstDayOfMonth);

  const weekStartDay = selectedWeek * 7 + 1 - adjustedFirstDay;
  const weekEndDay = (selectedWeek + 1) * 7 - adjustedFirstDay;

  return (
    <div className="flex flex-col items-center justify-center space-y-10 pt-10 ">
      <div
        className="text-center py-4 text-2xl text-white uppercase font-bold mb-10 w-full bg-rose-500 border rounded-md cursor-pointer"
        onClick={() => setSelectedWeek(null)}
      >
        Click back to <br /> Week
      </div>
      <h1 className="text-white font-bold font-sans text-5xl text-center mb-5">
        {`${selectedMonthName} of ${clickedYear}`}
      </h1>
      <div className="pt-0 w-[100%]">
        <ul className="grid grid-cols-1">
          {Day.map((day, index) => {
            const currentDayOfMonth = weekStartDay + index;

            if (
              currentDayOfMonth < 1 ||
              currentDayOfMonth >
                new Date(clickedYear, selectedMonthIndex + 1, 0).getDate()
            ) {
              return null;
            }

            const todosForDay = todos.filter((todo) => {
              const todoDate = new Date(todo.dueDate);
              const dayOfMonth = todoDate.getDate();
              const monthNumber = todoDate.getMonth();
              const yearNumber = todoDate.getFullYear();

              return (
                monthNumber === selectedMonthIndex &&
                yearNumber === clickedYear &&
                dayOfMonth === currentDayOfMonth
              );
            });

            return (
              <li
                key={index}
                className="list-none md:w-full border-2 mb-5 border-transparent hover:border-2 hover:border-cyan-500 cursor-pointer "
                onClick={() => clickDayHandler}
              >
                <div className="w-full 2xl:w-[52rem] h-96 border bg-white rounded-md relative hide-scrollbar flex pt-6 overflow-auto">
                  <span className="absolute top-1 left-1">{day}</span>
                  <div className="font-sans text-2xl rounded-full  flex flex-col first-letter:capitalize p-4 space-y-2 ">
                    {todosForDay.map(
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

export default DayView;
