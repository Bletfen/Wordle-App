export type TileStatus = "correct" | "present" | "absent" | null;

export default function Input({
  value,
  status,
}: {
  value: string;
  status?: TileStatus[];
}) {
  const numberOfLetters = Array.from({ length: 5 }, (_, i) => i);
  const getTileClasses = (state: TileStatus) => {
    if (state === "correct") return "bg-[#538d4e]";
    if (state === "present") return "bg-[#b59f3b]";
    if (state === "absent") return "bg-[#939b9f]";
    return "bg-[#939B9F4D]";
  };

  return (
    <div className="flex gap-[1.1rem]">
      {numberOfLetters.map((index) => (
        <div key={index}>
          <div
            className={`flex items-center justify-center ${getTileClasses(
              status?.[index] ?? null
            )}
              w-[7.6rem] h-[7.6rem] text-[3.5rem] font-[800] 
              text-white rounded-[0.5rem]`}
          >
            {value[index] ?? ""}
          </div>
        </div>
      ))}
    </div>
  );
}
