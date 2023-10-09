import React from "react";
import useLoadRemindersFromDb from "./useLoadRemindersFromDb";

interface RemindersProps {
  userShowDropdown: boolean;
  loggedUserId: string;
}

const Reminders: React.FC<RemindersProps> = ({
  userShowDropdown,
  loggedUserId,
}) => {
  const [reminders, setReminders] = useLoadRemindersFromDb(loggedUserId);

  return (
    <div className="">
      {userShowDropdown && (
        <div className="absolute -left-[12rem] top-[5.8rem] w-[25rem] h-[30rem] border-2  bg-rose-500 rounded-lg">
          <span className="absolute  border-rose-500 w-0 h-0 border-l-[2rem] border-l-transparent border-r-[2rem] border-r-transparent border-b-[2rem] border-solid -top-5 left-[13.4rem] transform -translate-x-1/2"></span>
          <div className="flex flex-col mt-5 justify-center items-center space-y-3 p-5 overflow-y-auto h-[28rem]">
            {reminders.length > 0 ? (
              reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="w-full h-20 bg-white rounded-lg "
                >
                  <div className="flex flex-col justify-center pt-7 pl-3 relative">
                    <span className="font-bold font-sans">
                      Time: {reminder.reminderTime}
                    </span>
                    <span className="font-bold font-sans">
                      Title: {reminder.title}
                    </span>
                    <span className="absolute top-1 right-5 font-sans">
                      {reminder.reminderDate}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <span className="text-xl text-white font-bold text-center">
                No reminders in the past.
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reminders;
