import { Module } from "@nestjs/common";
import { QuizController } from "src/quiz/quiz.controller";
import { QuizService } from "src/quiz/quiz.service";

@Module({
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
