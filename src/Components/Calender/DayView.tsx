import React, { useState } from "react";

type DayViewProps = {
  selectedMonthName: string;
  selectedYear: number;
  selectedWeek: string;
  setSelectedWeek: React.Dispatch<React.SetStateAction<number | null>>;
};

const DayView = (props: DayViewProps) => {
  const Day = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="pt-10 w-[55rem] sm:w-[40rem] mx-auto">
      <div
        className="text-center py-4 text-2xl text-white uppercase font-bold mb-10 w-full bg-red-400 border rounded-md cursor-pointer "
        onClick={() => props.setSelectedWeek(null)}
      >
        Click back to <br /> Week
      </div>
      <h1 className="text-white font-bold font-sans text-5xl text-center mb-5">
        {`${props.selectedWeek}  ${props.selectedMonthName}, ${props.selectedYear}`}
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3">
        {Day.map((day, index) => (
          <li
            key={index}
            className="list-none md:w-full border-2 mb-5 border-transparent hover:border-2 hover:border-cyan-500 cursor-pointer "
          >
            <div className="w-full h-52 border  bg-white rounded-md relative hide-scrollbar">
              <span className="absolute top-1 left-1 text-2xl font-thin">
                {day}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DayView;
