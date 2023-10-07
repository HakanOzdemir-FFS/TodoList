import React, { useState, useEffect } from "react";

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const darkModeHandler = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div>
      <span
        onClick={darkModeHandler}
        className={`${
          darkMode ? "lnr-sun" : "lnr-moon"
        } cursor-pointer lnr text-5xl text-white`}
      ></span>
    </div>
  );
};

export default DarkMode;
