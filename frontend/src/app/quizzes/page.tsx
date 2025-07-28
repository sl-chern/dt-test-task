"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import {
  GetQuizzesResponse,
  useDeleteQuizService,
  useGetQuizzesService,
} from "@/services/api/quiz";
import Button from "@/components/button";

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<GetQuizzesResponse>([]);
  const [loading, setLoading] = useState(true);
  const getQuizzes = useGetQuizzesService();
  const deleteQuiz = useDeleteQuizService();

  useEffect(() => {
    getQuizzes()
      .then((data) => {
        if (data.data) setQuizzes(data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [getQuizzes]);

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this quiz?");
    if (!confirmed) return;

    try {
      await deleteQuiz(id);
      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
    } catch {}
  };

  if (loading) {
    return <p className="p-4 text-center">Loading quizzes...</p>;
  }

  if (quizzes.length === 0) {
    return <p className="p-4 text-center">No quizzes found.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Quiz List</h1>
        <Link href={"/create"}>
          <Button>Create quiz</Button>
        </Link>
      </div>
      <ul className="space-y-3">
        {quizzes.map((quiz) => (
          <li
            key={quiz.id}
            className="flex justify-between items-center border rounded-lg p-4 hover:bg-gray-50 transition"
          >
            <Link href={`/quizzes/${quiz.id}`} className="flex flex-col">
              <span className="text-lg font-medium">{quiz.title}</span>
              <span className="text-sm text-gray-500">
                {quiz.questionCount} questions
              </span>
            </Link>
            <button
              onClick={() => handleDelete(quiz.id)}
              className="text-red-500 hover:text-red-700 p-2"
              title="Delete quiz"
            >
              <Trash2 size={18} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
