import React, { useState } from "react";

const MonthView = () => {
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
  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const handleMonthClick = (index: number) => () => {
    setSelectedMonth(index);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop > 20) {
      setSelectedMonth(null);
      console.log(e.currentTarget.scrollTop);
    }
  };

  if (selectedMonth !== null) {
    return (
      <div className="">
        <ul>
          {weeks.map((week, index) => (
            <li
              key={index}
              className="list-none border-2 mb-5 border-transparent hover:border-2 hover:border-cyan-500 cursor-pointer "
              
              onClick={handleMonthClick(index)}
            >
              <div
                className="w-full h-80 border overflow-y-auto bg-white rounded-md relative hide-scrollbar"
                onScroll={handleScroll}
              >
                <span className="h-96 absolute top-1 left-1 text-2xl font-thin">
                  {week}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const MonthList = Month.map((month, index) => (
    <li
      key={index}
      className="list-none border-2 border-transparent hover:border-2 hover:border-cyan-500 cursor-pointer"
      onClick={handleMonthClick(index)}
    >
      <div className="w-96 h-96 border bg-white rounded-md relative">
        <span className="absolute top-1 left-1 text-2xl font-thin">
          {month}
        </span>
      </div>
    </li>
  ));

  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      <h1 className="text-5xl font-bold">21.11.1998</h1>
      <ul className="grid grid-cols-2 items-center justify-center gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4">
        {MonthList}
      </ul>
      {selectedMonth !== null && (
        <div>Haftaları Göster: {Month[selectedMonth]}</div>
      )}
    </div>
  );
};

export default MonthView;
