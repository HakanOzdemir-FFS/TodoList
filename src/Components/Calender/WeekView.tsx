import React, { useState } from "react";

import DayView from "./DayView";

type WeekViewProps = {
  selectedMonthName: string;
  selectedYear: number;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number | null>>;
};

const WeekView = (props: WeekViewProps) => {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const Weeks = ["1st Week of", "2nd Week of", "3rd Week of", "4th Week of"];

  const handleWeekClick = (index: number) => () => {
    setSelectedWeek(index);
  };

  if (selectedWeek !== null) {
    return (
      <DayView
        selectedYear={props.selectedYear}
        selectedMonthName={props.selectedMonthName}
        selectedWeek={Weeks[selectedWeek]}
        setSelectedWeek={setSelectedWeek}
      />
    );
  }

  return (
    <div className="pt-10 w-[55rem] sm:w-[40rem] mx-auto">
      <div
        className="text-center py-4 text-2xl text-white uppercase font-bold mb-10 w-full bg-red-400 border rounded-md cursor-pointer"
        onClick={() => props.setSelectedMonth(null)}
      >
        Click back to <br /> Month
      </div>
      <h1 className="text-white font-bold font-sans text-5xl text-center mb-5">
        {`${props.selectedMonthName}, ${props.selectedYear}`}
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3">
        {Weeks.map((week, index) => (
          <li
            key={index}
            className="list-none md:w-full border-2 mb-5 border-transparent hover:border-2 hover:border-cyan-500 cursor-pointer "
            onClick={handleWeekClick(index)}
          >
            <div className="w-full h-52 border  bg-white rounded-md relative hide-scrollbar">
              <span className="absolute top-1 left-1 text-2xl font-thin">
                {week}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeekView;
