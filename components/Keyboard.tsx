export default function Keyboard({
  onLetterClick,
  handleDelete,
}: {
  onLetterClick: (letter: string) => void;
  handleDelete: () => void;
}) {
  const georgianKeyboard = [
    ["ქ", "წ", "ჭ", "ე", "რ", "ღ", "ტ", "თ", "ყ", "უ", "ი", "ო", "პ"],

    ["ა", "ს", "შ", "დ", "ფ", "გ", "ჰ", "ჯ", "კ", "ლ"],

    ["ზ", "ძ", "ხ", "ც", "ჩ", "ვ", "ბ", "ნ", "მ"],
  ];
  return (
    <div
      style={{ backgroundColor: "rgba(218, 220, 224, 0.03)" }}
      className="px-[2.4rem] py-[3.3rem] flex flex-col
      gap-[0.9rem] mt-[5.4rem] rounded-[1.5rem]"
    >
      {georgianKeyboard.map((key) => (
        <div
          className="flex gap-[0.9rem] text-[1.8rem]
          font-[600] text-[#dadce0] items-center
          justify-center
          "
        >
          {key.map((key) => (
            <button
              onClick={() => onLetterClick(key)}
              className="py-[1.2rem] px-[1.6rem] bg-[#565f7e]
              rounded-[0.5rem] cursor-pointer"
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
        <button className="py-[1.6rem] px-[2.5rem] bg-[#565f7e] rounded-[0.5rem]">
          Enter
        </button>
        <button
          className="py-[1.6rem] px-[2.5rem] bg-[#565f7e] rounded-[0.5rem]"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
