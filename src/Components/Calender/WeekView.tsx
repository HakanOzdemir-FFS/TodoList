import React, { useState } from "react";
import DayView from "./DayView";
import { Todo } from "./UseLoadFromDb";

type WeekViewProps = {
  selectedMonthName: string;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number | null>>;
  loggedUserId: string;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
  clickedYear: number;
  selectedMonthIndex: number;
};

const WeekView: React.FC<WeekViewProps> = ({
  selectedMonthName,
  setSelectedMonth,
  loggedUserId,
  todos,
  setTodos,
  clickedYear,
  selectedMonthIndex,
}) => {
  const weekDay = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState(clickedYear);

  const handleDayClick = (index: number | null) => () => {
    setSelectedDay(index);
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-emerald-500";
      case "medium":
        return "bg-sky-400";
      case "high":
        return "bg-rose-500";
      default:
        return "";
    }
  };

  if (selectedDay !== null) {
    return (
      <DayView
        selectedMonthIndex={selectedMonthIndex}
        todos={todos}
        setTodos={setTodos}
        selectedYear={selectedYear}
        selectedMonthName={selectedMonthName}
        setSelectedDay={setSelectedDay}
        selectedDay={selectedDay}
      />
    );
  }

  const getPriorityFrequencyForDate = (
    todos: Todo[],
    date: Date
  ): { [key: string]: number } => {
    const priorities = getPrioritiesForDate(todos, date);
    const frequency: { [key: string]: number } = {};
    priorities.forEach((priority) => {
      if (!frequency[priority]) {
        frequency[priority] = 1;
      } else {
        frequency[priority]++;
      }
    });
    return frequency;
  };

  const getPrioritiesForDate = (todos: Todo[], date: Date): string[] => {
    return todos
      .filter((todo) => {
        const todoDate = new Date(todo.dueDate);
        return (
          todoDate.getDate() === date.getDate() &&
          todoDate.getMonth() === date.getMonth() &&
          todoDate.getFullYear() === date.getFullYear()
        );
      })
      .map((todo) => todo.priority);
  };

  const getFirstDayOfMonth = (year: number, monthIndex: number): number => {
    const firstDay = new Date(year, monthIndex, 1);
    return firstDay.getDay();
  };

  const getDaysInMonth = (year: number, monthIndex: number): number => {
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  const renderCalendar = (year: number, monthIndex: number) => {
    let firstDay = getFirstDayOfMonth(year, monthIndex);

    firstDay = firstDay === 0 ? 6 : firstDay - 1;

    const daysInMonth = getDaysInMonth(year, monthIndex);
    const daysInPrevMonth =
      monthIndex === 0
        ? getDaysInMonth(year - 1, 11)
        : getDaysInMonth(year, monthIndex - 1);

    let currentDay = 1 - firstDay;

    const weeks = [];

    for (let i = 0; i < 6; i++) {
      const days = [];

      for (let j = 0; j < 7; j++) {
        const date = new Date(year, monthIndex, currentDay);
        const priorityFrequencies = getPriorityFrequencyForDate(todos, date);

        const priorityDots = Object.keys(priorityFrequencies).map(
          (priority) => (
            <div
              key={priority}
              className={`w-4 h-4 rounded-full ${getPriorityClass(
                priority
              )} flex items-center justify-center relative`}
            >
              <span className="text-xs text-white">
                {priorityFrequencies[priority]}
              </span>
            </div>
          )
        );

        if (currentDay <= 0) {
          // Perv Month
          days.push(
            <div
              key={j}
              className={`w-12 h-12 text-gray-400 text-2xl font-bold justify-center items-center flex`}
            >
              {daysInPrevMonth + currentDay}
            </div>
          );
        } else if (currentDay > daysInMonth) {
          // Next Month
          days.push(
            <div
              key={j}
              className="w-12 h-12 text-gray-400 text-2xl font-bold justify-center items-center flex relative"
            >
              {currentDay - daysInMonth}
            </div>
          );
        } else {
          // This Month
          days.push(
            <div
              key={j}
              onClick={handleDayClick(currentDay)}
              className="w-12 h-12 text-black text-2xl font-bold justify-center items-center flex flex-col cursor-pointer"
            >
              {currentDay}
              <div
                className=" flex flex-col;
              "
              >
                {priorityDots}
              </div>
            </div>
          );
        }

        currentDay++;
      }

      weeks.push(
        <div key={i} className="flex space-x-10">
          {days}
        </div>
      );
    }

    return weeks;
  };

  const prevMonthHandler = () => {
    if (selectedMonthIndex <= 0) {
      setSelectedYear(selectedYear - 1);
      setSelectedMonth(11);
    } else {
      setSelectedMonth(selectedMonthIndex - 1);
    }
  };

  const nextMonthHandler = () => {
    if (selectedMonthIndex >= 11) {
      setSelectedYear(selectedYear + 1);
      setSelectedMonth(0);
    } else {
      setSelectedMonth(selectedMonthIndex + 1);
    }
  };

  return (
    <div className="mt-10 pb-20">
      <div
        className="text-center py-4 text-2xl text-white uppercase font-bold mb-10 w-full bg-rose-500 border rounded-md cursor-pointer "
        onClick={() => setSelectedMonth(null)}
      >
        Click back to <br /> Month
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="flex justify-center items-center w-full  mb-10 space-x-5 ">
          <button
            className="lnr lnr-arrow-left text-white font-bold text-6xl"
            onClick={prevMonthHandler}
          ></button>
          <h1 className="text-white font-bold font-sans text-5xl text-center whitespace-nowrap w-96">
            {`${selectedMonthName} ${selectedYear}`}
          </h1>
          <button
            className="lnr lnr-arrow-right text-white font-bold text-6xl"
            onClick={nextMonthHandler}
          ></button>
        </div>
      </div>

      <div className="w-[100%]  h-auto p-16 bg-white flex flex-col space-y-10 justify-center items-center rounded-md shadow-md">
        <div className="flex space-x-10">
          {weekDay.map((day, index) => (
            <div
              key={index}
              className="w-12 h-12 bg-sky-500 text-white rounded-md font-bold justify-center items-center flex"
            >
              {day}
            </div>
          ))}
        </div>
        {renderCalendar(selectedYear, selectedMonthIndex)}
      </div>
    </div>
  );
};

export default WeekView;
