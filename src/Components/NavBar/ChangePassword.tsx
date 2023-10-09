import React, { useState } from "react";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";

interface ChangePasswordProps {
  onChangePasswordSuccess: () => void;
  setShowChangePasswordComponent: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({
  onChangePasswordSuccess,
  setShowChangePasswordComponent,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePasswordError, setChangePasswordError] = useState(false);
  const [changePasswordMessage, setChangePasswordMessage] = useState("");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setChangePasswordError(true);
      setChangePasswordMessage(
        "New password and confirm password do not match."
      );
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (user?.email) {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      try {
        if (user.email === "try@todoapp.com") {
          throw new Error("Demo account password cannot be changed.");
        }

        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);

        setChangePasswordError(false);
        setChangePasswordMessage("Password changed successfully.");
        onChangePasswordSuccess();
      } catch (error: any) {
        if (error.code === "auth/wrong-password") {
          setChangePasswordMessage("Current password is incorrect.");
        } else if (error.code === "auth/requires-recent-login") {
          setChangePasswordMessage("Please re-login and try again.");
        } else if (
          error.message === "Demo account password cannot be changed."
        ) {
          setChangePasswordMessage(error.message);
        } else {
          setChangePasswordMessage(
            "Error changing password. Please try again."
          );
        }
        setChangePasswordError(true);
      }
    }
  };

  return (
    <div
      className="items-center justify-center flex flex-col space-y-10 font-bold bg-opacity-80 bg-gray-900 text-2xl z-50 top-0 left-0 fixed w-screen h-screen"
      onClick={() => setShowChangePasswordComponent(false)}
    >
      <div
        className="w-auto p-32  h-auto bg-white flex justify-center items-center flex-col space-y-10 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {changePasswordMessage && (
          <div className="text-green-500">{changePasswordMessage}</div>
        )}
        {changePasswordError && (
          <div className="text-rose-500">{changePasswordError}</div>
        )}

        <div className="flex justify-center items-center space-x-12">
          <span className="w-56">Current Password:</span>
          <input
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="border-2 py-2 pl-4 pr-28 focus:outline-2 outline-sky-500"
            type="password"
            placeholder="Current Password"
          />
        </div>
        <div className="flex justify-center items-center space-x-12">
          <span className="w-56">New Password:</span>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border-2 py-2 pl-4 pr-28 focus:outline-2 outline-sky-500"
            type="password"
            placeholder="New Password"
          />
        </div>
        <div className="flex justify-center items-center space-x-12">
          <span className="w-56">Confirm Password:</span>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border-2 py-2 pl-4 pr-28 focus:outline-2 outline-sky-500"
            type="password"
            placeholder="Confirm Password"
          />
        </div>

        <button
          className="w-[50%] bg-sky-500 text-white py-2 rounded-md"
          onClick={handleChangePassword}
        >
          Change Password
        </button>
        <span
          className="lnr lnr-cross text-5xl absolute top-0 right-10 cursor-pointer"
          onClick={() => setShowChangePasswordComponent(false)}
        ></span>
      </div>
    </div>
  );
};

export default ChangePassword;
