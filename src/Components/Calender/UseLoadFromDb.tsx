import { useState, useEffect } from "react";
import { fireStoredb } from "../../Config/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

type Todo = {
  dueDate: string;
  priority: string;
  steps: string[];
  title: string;
  userId: string;
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
          todosData.push(doc.data() as Todo);
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
