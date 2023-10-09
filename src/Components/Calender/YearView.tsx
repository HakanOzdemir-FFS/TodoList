import React, { useState, useEffect } from "react";
import MonthView from "./MonthView";
import UseLoadFromDb from "./UseLoadFromDb";
import { Todo } from "./UseLoadFromDb";
import Greet from "../WelcomePage/Greet";

type YearViewProps = {
  loggedUserId: string;
};

const YearView: React.FC<YearViewProps> = ({ loggedUserId }) => {
  const Year = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [todos, setTodos] = UseLoadFromDb(loggedUserId);

  const handleYearClick = (index: number) => () => {
    setSelectedYear(index);
  };

  if (selectedYear !== null) {
    return (
      <MonthView
        todos={todos}
        setTodos={setTodos}
        loggedUserId={loggedUserId}
        selectedYearIndex={selectedYear}
        setSelectedYear={setSelectedYear}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-10 pt-10 ">
      <h1 className="text-white font-bold font-sans text-5xl text-center">
        <Greet />
      </h1>
      <div className="pt-0 w-[100%]">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3">
          {Year.map((year, index) => {
            const todoCountForYear = todos.filter((todo) =>
              todo.dueDate.startsWith(String(year))
            ).length;

            const baseSizeDiv = 1;
            const incrementDiv = 0.5;
            const sizeDiv = baseSizeDiv + todoCountForYear * incrementDiv;

            const baseSizeText = 1;
            const incrementText = 0.2;
            const sizeText = baseSizeText + todoCountForYear * incrementText;

            return (
              <li
                key={index}
                className="list-none md:w-full border-2 mb-5 border-transparent hover:border-2  cursor-pointer "
                onClick={handleYearClick(index)}
              >
                <div className="2xl:w-52 h-52 border bg-white rounded-md relative hide-scrollbar flex justify-center items-center hover:border-2 hover:border-cyan-500">
                  <span className="absolute top-1 left-1">{year}</span>
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

export default YearView;
