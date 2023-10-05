import React, { useState } from "react";
import MonthView from "./MonthView";

const YearView = () => {
  const Year = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const handleYearClick = (index: number) => () => {
    setSelectedYear(index);
  };

  if (selectedYear !== null) {
    return <MonthView selectedYearIndex={selectedYear} setSelectedYear={setSelectedYear} />;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-10 pt-10 w">
      <h1 className="text-white font-bold font-sans text-5xl text-center">
        Welcome
      </h1>
      <div className="pt-0 w-[55rem] sm:w-[40rem] ">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3">
          {Year.map((year, index) => (
            <li
              key={index}
              className="list-none md:w-full border-2 mb-5 border-transparent hover:border-2 hover:border-cyan-500 cursor-pointer "
              onClick={handleYearClick(index)}
            >
              <div className="w-full h-52 border  bg-white rounded-md relative hide-scrollbar">
                <span className="absolute top-1 left-1 text-2xl font-thin">
                  {year}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      ;
    </div>
  );
};

export default YearView;
