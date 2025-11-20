"use client";
import Keyboard from "@/components/Keyboard";
import Input, { TileStatus } from "../components/Input";
import ErrorMessage from "@/components/ErrorMessage";
import words from "@/data/words.json";
import { useMemo, useState } from "react";

const NUMBER_OF_ROWS = 6;
const LETTERS_PER_ROW = 5;
const START_DATE = new Date("2025-01-01T00:00:00Z");

const getDailyWord = () => {
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - START_DATE.getTime()) / (1000 * 60 * 60 * 24)
  );
  const index = ((diffInDays % words.length) + words.length) % words.length;
  return words[index];
};

const evaluateGuess = (guess: string, target: string): TileStatus[] => {
  const result: TileStatus[] = Array.from(
    { length: LETTERS_PER_ROW },
    () => "absent" as TileStatus
  );
  const remainingCounts: Record<string, number> = {};
  const targetChars = target.split("");
  const guessChars = guess.split("");

  for (let i = 0; i < LETTERS_PER_ROW; i++) {
    if (guessChars[i] === targetChars[i]) {
      result[i] = "correct";
    } else {
      const letter = targetChars[i];
      remainingCounts[letter] = (remainingCounts[letter] ?? 0) + 1;
    }
  }

  for (let i = 0; i < LETTERS_PER_ROW; i++) {
    if (result[i] === "correct") continue;
    const letter = guessChars[i];
    if (remainingCounts[letter]) {
      result[i] = "present";
      remainingCounts[letter] -= 1;
    }
  }

  return result;
};

export default function Home() {
  const [inputs, setInputs] = useState(
    Array.from({ length: NUMBER_OF_ROWS }, () => "")
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [rowStatuses, setRowStatuses] = useState<TileStatus[][]>(
    Array.from(
      { length: NUMBER_OF_ROWS },
      () => Array(LETTERS_PER_ROW).fill(null) as TileStatus[]
    )
  );
  const [keyboardStatuses, setKeyboardStatuses] = useState<
    Record<string, TileStatus>
  >({});

  const targetWord = useMemo(() => getDailyWord(), []);

  const handleLetterClick = (letter: string) => {
    if (isGameOver) return;
    if (showError) setShowError(false);
    if (currentRow >= inputs.length) return;
    if (inputs[currentRow].length >= LETTERS_PER_ROW) return;
    const newInputs = [...inputs];
    newInputs[currentRow] = (newInputs[currentRow] ?? "") + letter;
    setInputs(newInputs);
  };

  const handleDelete = () => {
    if (isGameOver) return;
    setShowError(false);
    if (currentRow >= inputs.length) return;
    if (inputs[currentRow].length === 0) return;
    const newInputs = [...inputs];
    newInputs[currentRow] = newInputs[currentRow].slice(0, -1);
    setInputs(newInputs);
  };

  const handleEnter = () => {
    if (isGameOver) return;
    const guess = inputs[currentRow];
    if (guess.length < LETTERS_PER_ROW) return;
    if (!words.includes(guess)) {
      setShowError(true);
      return;
    }
    const evaluations = evaluateGuess(guess, targetWord);
    setRowStatuses((prev) => {
      const next = prev.map((row) => [...row]);
      next[currentRow] = evaluations;
      return next;
    });
    setKeyboardStatuses((prev) => {
      const updated = { ...prev };
      evaluations.forEach((status, i) => {
        const letter = guess[i];
        const prevStatus = updated[letter];
        if (prevStatus === "correct") return;
        if (prevStatus === "present" && status === "absent") return;
        updated[letter] = status;
      });
      return updated;
    });

    if (guess === targetWord) {
      setIsGameOver(true);
      setStatusMessage("გამოიცანი");
      return;
    }
    if (currentRow === NUMBER_OF_ROWS - 1) {
      setIsGameOver(true);
      setStatusMessage(`სიტყვა იყო ${targetWord}`);
      return;
    }
    setCurrentRow((prev) => prev + 1);
  };

  return (
    <main className="flex flex-col gap-[1.1rem] items-center">
      {inputs.map((val, i) => (
        <Input key={i} value={val} status={rowStatuses[i]} />
      ))}
      {statusMessage && (
        <p className="text-white text-[1.6rem] font-semibold mt-4">
          {statusMessage}
        </p>
      )}
      {showError && <ErrorMessage />}
      <Keyboard
        onLetterClick={handleLetterClick}
        handleDelete={handleDelete}
        handleEnter={handleEnter}
        keyboardStatuses={keyboardStatuses}
      />
    </main>
  );
}
