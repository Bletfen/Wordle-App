import { TileStatus } from "./Input";

export default function Keyboard({
  onLetterClick,
  handleDelete,
  handleEnter,
  keyboardStatuses,
}: {
  onLetterClick: (letter: string) => void;
  handleDelete: () => void;
  handleEnter: () => void;
  keyboardStatuses: Record<string, TileStatus>;
}) {
  const georgianKeyboard = [
    ["ქ", "წ", "ჭ", "ე", "რ", "ღ", "ტ", "თ", "ყ", "უ", "ი", "ო", "პ"],

    ["ა", "ს", "შ", "დ", "ფ", "გ", "ჰ", "ჯ", "კ", "ლ"],

    ["ზ", "ძ", "ხ", "ც", "ჩ", "ვ", "ბ", "ნ", "მ"],
  ];

  const getTileClasses = (state: TileStatus) => {
    if (state === "correct") return "bg-[#538d4e]";
    if (state === "present") return "bg-[#b59f3b]";
    if (state === "absent") return "bg-[#3a3a3c]";
    return "bg-[#939B9F4D]";
  };
  return (
    <div
      style={{ backgroundColor: "rgba(218, 220, 224, 0.03)" }}
      className="px-[2.4rem] py-[3.3rem] flex flex-col
      gap-[0.9rem] mt-[5.4rem] rounded-[1.5rem]"
    >
      {georgianKeyboard.map((key, index) => (
        <div
          key={index}
          className="flex gap-[0.9rem] text-[1.8rem]
          font-[600] text-[#dadce0] items-center
          justify-center
          "
        >
          {key.map((key) => (
            <button
              onClick={() => onLetterClick(key)}
              className={`py-[1.2rem] px-[1.6rem]
              rounded-[0.5rem] cursor-pointer
              ${
                keyboardStatuses[key] === "correct"
                  ? "bg-[#6aaa64]"
                  : keyboardStatuses[key] === "present"
                  ? "bg-[#ceb02c]"
                  : keyboardStatuses[key] === "absent"
                  ? "bg-[#4c5255]"
                  : "bg-[#565f7e]"
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
      <div
        className="flex items-center
      justify-between text-[1.5rem] font-[600] text-[#dadce0]
      "
      >
        <button
          onClick={handleEnter}
          className="py-[1.6rem] px-[2.5rem] bg-[#565f7e] rounded-[0.5rem]
          cursor-pointer"
        >
          Enter
        </button>
        <button
          className="py-[1.6rem] px-[2.5rem] bg-[#565f7e] rounded-[0.5rem]
          cursor-pointer"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
