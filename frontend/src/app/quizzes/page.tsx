"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GetQuizzesResponse, useGetQuizzesService } from "@/services/api/quiz";
import Button from "@/components/button";
import QuizItem from "@/components/quiz-item";

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<GetQuizzesResponse>([]);
  const [loading, setLoading] = useState(true);
  const getQuizzes = useGetQuizzesService();

  useEffect(() => {
    getQuizzes()
      .then((data) => {
        if (data.data) setQuizzes(data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [getQuizzes]);

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
      <div className="flex flex-col gap-1">
        {quizzes.map((quiz) => (
          <QuizItem key={quiz.id} {...quiz} setQuizzes={setQuizzes} />
        ))}
      </div>
    </div>
  );
}
