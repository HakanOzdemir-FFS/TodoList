import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

interface LoginProps {
  onLoginSuccess: () => void;
  setLoggedUserId: React.Dispatch<React.SetStateAction<string>>;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, setLoggedUserId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logInError, setLogInError] = useState(false);
  const [logInMessage, setLogInMessage] = useState(false);

  const handleLogin = async () => {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential && userCredential.user && userCredential.user.uid) {
        setLoggedUserId(userCredential.user.uid);
      }

      setLogInError(false);
      setLogInMessage(true);
      localStorage.setItem("isLoggedIn", "true");
      onLoginSuccess();
    } catch (error) {
      setLogInError(true);
    }
  };

  return (
    <div className="items-center justify-center flex flex-col space-y-10 font-bold text-2xl z-50 relative">
      {logInMessage && <div className="text-green-500">Log In Successful</div>}
      {logInError && (
        <div className="text-rose-500">Please Check Email and Password</div>
      )}
      <div className="flex flex-col items-center md:space-y-3">
        <span className="text-xl">Example user</span>
        <span className="text-2xl font-bold">try@todoapp.com</span>
        <span className="text-2xl font-bold">123456</span>
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
        onClick={handleLogin}
        className="w-[50%] bg-sky-500 text-white py-2 rounded-md"
      >
        Log In
      </button>
    </div>
  );
};

export default Login;
