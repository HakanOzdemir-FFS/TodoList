import React, { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { fireStoredb } from "../../Config/firebase";

export type Reminder = {
  id?: string;
  reminderDate: string;
  reminderTime: string;
  userId: string;
  title: string;
};

const useLoadRemindersFromDb = (
  loggedUserId: string
): [Reminder[], React.Dispatch<React.SetStateAction<Reminder[]>>] => {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  const remindersCollection = collection(fireStoredb, "reminders");

  useEffect(() => {
    const userId = loggedUserId;

    const currentDate = new Date();
    const currentTimeStamp = currentDate.toISOString();

    const remindersQuery = query(
      remindersCollection,
      where("userId", "==", userId),
      where("reminderDateTime", "<=", currentTimeStamp)
    );

    const unsubscribe = onSnapshot(
      remindersQuery,
      (querySnapshot) => {
        const remindersData: Reminder[] = [];
        querySnapshot.forEach((doc) => {
          const reminderData = doc.data() as Reminder;
          remindersData.push({
            ...reminderData,
            id: doc.id,
          });
        });
        setReminders(remindersData);
      },
      (error: any) => {
        console.log("Error getting reminders: ", error);
      }
    );

    return () => unsubscribe();
  }, [loggedUserId]);

  return [reminders, setReminders];
};

export default useLoadRemindersFromDb;
