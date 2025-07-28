import { GetQuizzesResponse, useDeleteQuizService } from "@/services/api/quiz";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export interface QuizItemProps {
  id: string;
  title: string;
  questionCount: number;
  setQuizzes: Dispatch<SetStateAction<GetQuizzesResponse>>;
}

export default function QuizItem({
  id,
  title,
  questionCount,
  setQuizzes,
}: QuizItemProps) {
  const deleteQuiz = useDeleteQuizService();

  const handleDelete = async (id: string) => {
    try {
      await deleteQuiz(id);
      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
    } catch {}
  };

  return (
    <div className="flex justify-between items-center border rounded-lg p-4 hover:bg-gray-50 transition">
      <Link href={`/quizzes/${id}`} className="flex flex-col">
        <span className="text-lg font-medium">{title}</span>
        <span className="text-sm text-gray-500">{questionCount} questions</span>
      </Link>
      <button
        onClick={() => handleDelete(id)}
        className="text-red-500 hover:text-red-700 p-2"
        title="Delete quiz"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
