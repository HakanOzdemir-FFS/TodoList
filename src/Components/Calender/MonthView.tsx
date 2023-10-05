import React, { useState } from "react";
import WeekView from "./WeekView";

type MonthViewProps = {
  selectedYearIndex: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number | null>>;
};

const MonthView = (props: MonthViewProps) => {
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

  const clickedYear = 2023 + props.selectedYearIndex;

  if (selectedMonth !== null) {
    return (
      <WeekView
        selectedYear={clickedYear}
        selectedMonthName={Month[selectedMonth]}
        setSelectedMonth={setSelectedMonth}
      />
    );
  }
  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      <div className="pt-10 w-[55rem] sm:w-[40rem] ">
        <div
          className="text-center py-4 text-2xl text-white uppercase font-bold mb-10 w-full bg-red-400 border rounded-md cursor-pointer"
          onClick={() => props.setSelectedYear(null)}
        >
          Click back to <br /> Year
        </div>
        <h1 className="text-white font-bold font-sans text-5xl text-center mb-5">
          Year {clickedYear}
        </h1>
        <ul className="grid gap-x-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {Month.map((month, index) => (
            <li
              key={index}
              className="list-none md:w-full border-2 mb-5 border-transparent hover:border-2 hover:border-cyan-500 cursor-pointer "
              onClick={handleMonthClick(index)}
            >
              <div className="w-full h-52 border  bg-white rounded-md relative hide-scrollbar">
                <span className="absolute top-1 left-1 text-2xl font-thin">
                  {month}
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

export default MonthView;
