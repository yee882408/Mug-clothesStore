import { useState } from "react";

const useInput = (fn) => {
  const [input, setInput] = useState("");
  const [inputChange, setInputChange] = useState(false);

  const inputIsValid = fn(input);
  const inputIsInValid = !inputIsValid && inputChange;

  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  const blurHandler = (e) => {
    setInputChange(true);
  };

  const reset = () => {
    setInput("");
    setInputChange(false);
  };

  return {
    input,
    inputIsValid,
    inputIsInValid,
    inputHandler,
    blurHandler,
    reset,
  };
};

export default useInput;
