export default function Input({ value }: { value: string }) {
  const numberOfLetters = Array.from({ length: 5 }, (_, i) => i);
  return (
    <div className="flex gap-[1.1rem]">
      {numberOfLetters.map((index) => (
        <div key={index}>
          <div
            className="flex items-center justify-center bg-[#939B9F4D]
              w-[7.6rem] h-[7.6rem] text-[3.5rem] font-[800] 
              text-white rounded-[0.5rem]"
          >
            {value[index] ?? ""}
          </div>
        </div>
      ))}
    </div>
  );
}
