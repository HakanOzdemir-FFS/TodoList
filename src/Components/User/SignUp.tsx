import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const SignUp = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpError, setSignUpError] = useState(false);
  const [signUpMessage, setSignUpMessage] = useState("");

  const handleSignUp = async () => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const db = getDatabase();
      await set(ref(db, "users/" + user.uid), {
        name: name,
        surname: surname,
        birthday: birthday,
        email: email,
      });
      setSignUpError(false);
      setSignUpMessage("A user was successfully created.");
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "auth/email-already-in-use"
      ) {
        setSignUpMessage("An account with this email address already exists!");
        setSignUpError(true);
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        alert(error.message);
      } else {
        setSignUpMessage("An error occurred.");
        setSignUpError(true);
      }
    }
  };

  return (
    <div className=" flex justify-center items-baseline flex-col space-y-10 font-bold text-2xl">
      {!signUpError && <div className="text-green-500 self-center text-center">{signUpMessage}</div>}
      {signUpError && <div className="text-rose-500 text-center">{signUpMessage}</div>}
      <div className="flex justify-start items-center space-x-12">
        <span className="w-24">Name:</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2 py-2 pl-4 pr-28 focus:outline-2 outline-sky-500"
          type="text"
          placeholder="Name"
        />
      </div>
      <div className="flex justify-center items-center space-x-12">
        <span className="w-24">Surname:</span>
        <input
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          className="border-2 py-2 pl-4 pr-28 focus:outline-2 outline-sky-500"
          type="text"
          placeholder="Surname"
        />
      </div>
      <div className="flex justify-center items-center space-x-12">
        <span className="w-24">Birthday:</span>
        <input
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          className="border-2 py-2 pl-4 pr-28 focus:outline-2 outline-sky-500"
          type="date"
        />
      </div>
      <div className="flex justify-center items-center space-x-12">
        <span className="w-24">Email:</span>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 py-2 pl-4 pr-28 focus:outline-2 outline-sky-500"
          type="email"
          placeholder="Email"
        />
      </div>
      <div className="flex justify-center items-center space-x-12">
        <span className="w-24">Password:</span>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 py-2 pl-4 pr-28 focus:outline-2 outline-sky-500"
          type="password"
          placeholder="Password"
        />
      </div>
      <button
        onClick={handleSignUp}
        className="w-[50%] bg-sky-500 text-white py-2 rounded-md self-center"
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
