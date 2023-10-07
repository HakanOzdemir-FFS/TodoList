import React from "react";

const WelcomePage = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-center items-center mt-40 space-y-20 md:space-y-0 md:space-x-20">
      <div className="w-[25rem] h-[25rem] md:w-[30rem] md:h-[30rem] xl:w-[35rem] xl:h-[35rem] radial-gradient flex justify-center items-end rounded-xl 2xl:w-[45rem] 2xl:h-[45rem]">
        <img
          className="w-[22rem] h-[22rem] md:w-[25rem] md:h-[25rem] xl:w-[30rem] xl:h-[30rem] 2xl:w-[40rem] 2xl:h-[40rem]"
          src="/img/img.png"
          alt=""
        />
      </div>
      <div className="flex flex-col space-y-5">
        <div className="flex flex-col items-center text-7xl space-y-16">
          <h1 className="font-sans">Hi I am Hakan</h1>
          <h3 className="text-center">
            I am a <br /> Frontend Developer
          </h3>
        </div>
        <div className="flex flex-col items-center md:space-y-3">
          <span className="text-2xl font-sans text-stone-500">
            Please login to use the app
          </span>
          <span className="text-xl">Example user</span>
          <span className="text-2xl font-bold">try@todoapp.com</span>
          <span className="text-2xl font-bold">123456</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
