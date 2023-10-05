import React from "react";

const DayView = () => {
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
    <div className="pt-10 w-[55rem] sm:w-[40rem] ">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {Day.map((day, index) => (
          <li
            key={index}
            className="list-none md:w-full border-2 mb-5 border-transparent hover:border-2 hover:border-cyan-500 cursor-pointer "
          >
            <div className="w-full h-52 border  bg-white rounded-md relative hide-scrollbar">
              <span className="h-[150rem] absolute top-1 left-1 text-2xl font-thin">
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
