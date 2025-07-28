"use client";

import QuestionItem from "@/components/question-item";
import {
  GetQuizByIdResponse,
  useGetQuizByIdService,
} from "@/services/api/quiz";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuizDetailPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState<GetQuizByIdResponse>();
  const [loading, setLoading] = useState(true);
  const getQuizById = useGetQuizByIdService();

  useEffect(() => {
    getQuizById(id as string)
      .then((data) => {
        if (data.data) setQuiz(data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, getQuizById]);

  if (loading) {
    return <p className="p-4 text-center">Loading quiz...</p>;
  }

  if (!quiz) {
    return <div className="p-4 text-red-500">Failed to load quiz</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{quiz.title}</h1>

      {quiz.questions.map((question, questionIndex) => (
        <QuestionItem
          key={`${question.text}${question.type}`}
          index={questionIndex}
          {...question}
        />
      ))}
    </div>
  );
}
