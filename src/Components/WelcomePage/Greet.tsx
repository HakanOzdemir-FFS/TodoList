import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { ref, get } from "firebase/database";
import { database } from "../../Config/firebase";

const Greet = () => {
  const getUserData = async (userId: string) => {
    const userRef = ref(database, "users/" + userId);
    const userSnap = await get(userRef);

    if (userSnap.exists()) {
      return userSnap.val();
    } else {
      console.log("No user data available");
      return null;
    }
  };

  const [userName, setUserName] = useState("");
  const [surname, setSurname] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      getUserData(user.uid).then((data) => {
        if (data && data.surname) {
          setSurname(data.surname);
        }
        if (data && data.name) {
          setUserName(data.name);
        }
      });
    }
  }, []);

  return (
    <div>
      {userName && surname ? (
        <h1>
          Welcome, {userName} {surname}!
        </h1>
      ) : userName ? (
        <h1>Welcome, {userName}!</h1>
      ) : (
        <h1>Welcome</h1>
      )}
    </div>
  );
};

export default Greet;
