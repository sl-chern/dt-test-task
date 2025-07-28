import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";

export type Option = {
  text: string;
  isCorrect: boolean;
};

export type Question = {
  text: string;
  type: "BOOLEAN" | "INPUT" | "CHECKBOX";
  options?: Option[];
};

export type Quiz = {
  id: string;
  title: string;
  questions: Question[];
};

export type CreateQuizRequest = {
  title: string;
  questions: Question[];
};

export type CreateQuizResponse = Quiz;

export function useCreateQuizService() {
  const fetchBase = useFetch();

  return useCallback(
    (data: CreateQuizRequest) => {
      return fetchBase(`${API_URL}/quizzes`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse<CreateQuizResponse>);
    },
    [fetchBase],
  );
}

export type GetQuizzesResponse = {
  id: string;
  title: string;
  questionCount: number;
}[];

export function useGetQuizzesService() {
  const fetchBase = useFetch();

  return useCallback(() => {
    return fetchBase(`${API_URL}/quizzes`, {
      method: "GET",
    }).then(wrapperFetchJsonResponse<GetQuizzesResponse>);
  }, [fetchBase]);
}

export type GetQuizByIdResponse = Quiz;

export function useGetQuizByIdService() {
  const fetchBase = useFetch();

  return useCallback(
    (id: string) => {
      return fetchBase(`${API_URL}/quizzes/${id}`, {
        method: "GET",
      }).then(wrapperFetchJsonResponse<GetQuizByIdResponse>);
    },
    [fetchBase],
  );
}

export function useDeleteQuizService() {
  const fetchBase = useFetch();

  return useCallback(
    (id: string) => {
      return fetchBase(`${API_URL}/quizzes/${id}`, {
        method: "DELETE",
      }).then(wrapperFetchJsonResponse<void>);
    },
    [fetchBase],
  );
}
