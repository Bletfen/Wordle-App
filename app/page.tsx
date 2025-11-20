"use client";
import Keyboard from "@/components/Keyboard";
import Input from "../components/Input";
import { useState } from "react";

export default function Home() {
  const numberOfInputs = 5;
  const [inputs, setInputs] = useState(Array(numberOfInputs).fill(""));

  const handleLetterClick = (letter: string) => {
    const firstIncompleteIndex = inputs.findIndex((val) => val.length < 5);
    if (firstIncompleteIndex === -1) return;
    const newInputs = [...inputs];
    newInputs[firstIncompleteIndex] =
      (newInputs[firstIncompleteIndex] ?? "") + letter;
    setInputs(newInputs);
  };

  const handleDelete = () => {
    const lastFilledIndex = [...inputs]
      .reverse()
      .findIndex((val) => val.length > 0);
    if (lastFilledIndex !== -1) {
      const idx = inputs.length - 1 - lastFilledIndex;
      const newInputs = [...inputs];
      newInputs[idx] = newInputs[idx].slice(0, -1);
      setInputs(newInputs);
    }
  };
  return (
    <main className="flex flex-col gap-[1.1rem] items-center">
      {inputs.map((val, i) => (
        <Input key={i} value={val} />
      ))}
      <Keyboard onLetterClick={handleLetterClick} handleDelete={handleDelete} />
    </main>
  );
}
