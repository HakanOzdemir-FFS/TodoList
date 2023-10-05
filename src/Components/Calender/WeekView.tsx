import React, { useState } from "react";

import DayView from "./DayView";

type WeekViewProps = {
  handleMonthClick: (index: number) => () => void;

  // Diğer olası props'lar
};

const WeekView: React.FC<WeekViewProps> = ({ handleMonthClick, ...props }) => {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

  const handleWeekClick = (index: number) => () => {
    setSelectedWeek(index);
  };

  if (selectedWeek !== null) {
    return <DayView />;
  }

  return (
    <div className="pt-10 w-[55rem] sm:w-[40rem]">
      <ul>
        {weeks.map((week, index) => (
          <li
            key={index}
            className="list-none md:w-full border-2 mb-5 border-transparent hover:border-2 hover:border-cyan-500 cursor-pointer "
            onClick={handleWeekClick(index)}
          >
            <div className="w-full h-80 border overflow-y-auto bg-white rounded-md relative hide-scrollbar">
              <span className="h-[150rem] absolute top-1 left-1 text-2xl font-thin">
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
