import React, { useState } from "react";
import WeekView from "./WeekView";

type Todo = {
  dueDate: string;
  priority: string;
  steps: string[];
  title: string;
  userId: string;
};

type MonthViewProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  loggedUserId: string;
  selectedYearIndex: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number | null>>;
};

const MonthView: React.FC<MonthViewProps> = ({
  selectedYearIndex,
  setSelectedYear,
  loggedUserId,
  todos,
  setTodos,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const Month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleMonthClick = (index: number) => () => {
    setSelectedMonth(index);
  };

  const clickedYear = 2023 + selectedYearIndex;

  if (selectedMonth !== null) {
    return (
      <WeekView
        todos={todos}
        setTodos={setTodos}
        loggedUserId={loggedUserId}
        selectedYear={clickedYear}
        selectedMonthName={Month[selectedMonth]}
        setSelectedMonth={setSelectedMonth}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-10 pt-10 ">
      <div
        className="text-center py-4 text-2xl text-white uppercase font-bold mb-10 w-full bg-rose-500 border rounded-md cursor-pointer"
        onClick={() => setSelectedYear(null)}
      >
        Click back to <br /> Year
      </div>
      <h1 className="text-white font-bold font-sans text-5xl text-center mb-5">
        {`Year of ${clickedYear}`}
      </h1>
      <div className="pt-0 w-[100%]">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3">
          {Month.map((month, index) => {
            const todoCountForYear = todos.filter((todo) => {
              const monthNumber = new Date(todo.dueDate).getMonth();
              return monthNumber === index;
            }).length;

            const baseSizeDiv = 1;
            const incrementDiv = 0.5;
            const sizeDiv = baseSizeDiv + todoCountForYear * incrementDiv;

            const baseSizeText = 1;
            const incrementText = 0.2;
            const sizeText = baseSizeText + todoCountForYear * incrementText;

            return (
              <li
                key={index}
                className="list-none md:w-full border-2 mb-5 border-transparent hover:border-2 hover:border-cyan-500 cursor-pointer "
                onClick={handleMonthClick(index)}
              >
                <div className="2xl:w-52 h-52 border bg-white rounded-md relative hide-scrollbar flex justify-center items-center">
                  <span className="absolute top-1 left-1">{month}</span>
                  <div
                    className="font-sans text-2xl rounded-full bg-rose-500 flex justify-center items-center"
                    style={{
                      width: `${sizeDiv}rem`,
                      height: `${sizeDiv}rem`,
                      fontSize: `${sizeText}rem`,
                    }}
                  >
                    {todoCountForYear}
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

export default MonthView;
