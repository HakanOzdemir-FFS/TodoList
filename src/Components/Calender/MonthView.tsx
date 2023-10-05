import React, { useState } from "react";
import WeekView from "./WeekView";

const MonthView = () => {
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

  const MonthList = Month.map((month, index) => (
    <li
      key={index}
      className="list-none border-2 border-transparent hover:border-2 hover:border-cyan-500 cursor-pointer"
      onClick={handleMonthClick(index)}
    >
      <div className="overflow-y-auto bg-white">
        <div className="w-[25rem] h-[25rem] border bg-white rounded-md relative">
          <span className="absolute top-1 left-1 text-2xl font-thin">
            {month}
          </span>
        </div>
      </div>
    </li>
  ));

  if (selectedMonth !== null) {
    return <WeekView handleMonthClick={handleMonthClick} />;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-10 pt-10 w">
      <h1 className="text-5xl font-bold text-white">21.11.1998</h1>
      <ul className="grid grid-cols-2 items-center justify-center gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4">
        {MonthList}
      </ul>
    </div>
  );
};

export default MonthView;
