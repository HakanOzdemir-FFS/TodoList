import { useState, useEffect } from "react";
import { fireStoredb } from "../../Config/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export type Todo = {
  id?: string;
  dueDate: string;
  priority: string;
  steps: { text: string; completed: boolean }[];
  title: string;
  userId: string;
  completed: boolean;
  percentage?: string;
};

const useLoadFromDb = (
  loggedUserId: string
): [Todo[], React.Dispatch<React.SetStateAction<Todo[]>>] => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const userId = loggedUserId;

    const todosCollection = collection(fireStoredb, "todos");
    const todosQuery = query(
      todosCollection,
      where("userId", "==", userId),
      orderBy("dueDate", "asc")
    );

    const unsubscribe = onSnapshot(
      todosQuery,
      (querySnapshot) => {
        const todosData: Todo[] = [];
        querySnapshot.forEach((doc) => {
          const todoData = doc.data() as Todo;
          todosData.push({
            ...todoData,
            id: doc.id,
          });
        });
        setTodos(todosData);
      },
      (error: any) => {
        console.log("Error getting todos: ", error);
      }
    );

    return () => unsubscribe();
  }, [loggedUserId]);

  return [todos, setTodos];
};

export default useLoadFromDb;
