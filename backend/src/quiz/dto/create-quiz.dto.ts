export interface CreateQuizDto {
  title: string;
  questions: QuestionDto[];
}

export interface QuestionDto {
  text: string;
  type: "BOOLEAN" | "INPUT" | "CHECKBOX";
  options?: OptionDto[];
}

export interface OptionDto {
  text: string;
  isCorrect: boolean;
}
