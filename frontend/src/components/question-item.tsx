import { Option } from "@/services/api/quiz";
import OptionItem from "./option-item";

export interface QuestionItemProps {
  index: number;
  text: string;
  type: string;
  options?: Option[];
}

export default function QuestionItem({
  index,
  text,
  options,
  type,
}: QuestionItemProps) {
  return (
    <div
      key={text}
      className="border rounded-xl p-4 shadow-sm bg-white space-y-2"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {index + 1}. {text}
        </h2>
        <span className="text-sm text-gray-500 italic">{type}</span>
      </div>
      <div className="flex flex-col gap-1 text-gray-700">
        {options?.map((option, optionIndex) => (
          <OptionItem
            key={`${option.text}${optionIndex}`}
            isCorrect={option.isCorrect}
          >
            {option.text}
          </OptionItem>
        ))}
      </div>
    </div>
  );
}
