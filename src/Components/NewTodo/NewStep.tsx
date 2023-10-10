import { stringify } from "querystring";
import React, { useState, useRef } from "react";

type NewStepProps = {
  steps: string[];
  setSteps: React.Dispatch<React.SetStateAction<string[]>>;
};

const NewStep: React.FC<NewStepProps> = ({ steps, setSteps }) => {
  const lastInputRef = useRef<HTMLInputElement | null>(null);

  const addStep = () => {
    if (steps[steps.length - 1] !== "") {
      setSteps([...steps, ""]);
    }
  };

  const updateStep = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (lastInputRef.current?.value.length !== 0) {
      if (e.key === "Enter") {
        addStep();
        setTimeout(() => {
          lastInputRef.current && lastInputRef.current.focus();
        }, 0);
      }
    }
  };

  return (
    <div>
      <ul className="mt-10 flex flex-col justify-center items-center space-y-10 list-decimal font-sans text-3xl">
        {steps.map((step, index) => (
          <li key={index}>
            <input
              ref={index === steps.length - 1 ? lastInputRef : null}
              value={step}
              onChange={(e) => updateStep(index, e.target.value)}
              onKeyDown={handleKeyDown}
              className="py-2 pl-6 pr-32 border h-auto overflow-y-auto border-cyan-500 shadow-sm focus:outline-2 outline-sky-500"
              type="text"
              placeholder={`Please write ${index + 1}. step`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewStep;
