import { z } from "zod";

export const OptionSchema = z.object({
  text: z.string().min(1, "Option text is required"),
  isCorrect: z.boolean(),
});

export const QuestionSchema = z
  .object({
    text: z.string().min(1, "Question text is required"),
    type: z.enum(["BOOLEAN", "INPUT", "CHECKBOX"]),
    options: z.array(OptionSchema).optional(),
  })
  .superRefine((question, ctx) => {
    if (
      (question.type === "CHECKBOX" || question.type === "BOOLEAN") &&
      (!question.options || question.options.length === 0)
    ) {
      ctx.addIssue({
        path: ["options"],
        code: z.ZodIssueCode.custom,
        message: "Options are required for CHECKBOX and BOOLEAN questions",
      });
    }
  });

export const CreateQuizSchema = z.object({
  title: z.string().min(1, "Quiz title is required"),
  questions: z
    .array(QuestionSchema)
    .min(1, "At least one question is required"),
});
