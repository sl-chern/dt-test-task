import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { QuizService } from "src/quiz/quiz.service";
import { CreateQuizDto } from "src/quiz/dto/create-quiz.dto";
import { ZodPipe } from "src/utils/zod/zod.pipe";
import { CreateQuizSchema } from "./schema/create-quiz.schema";

@Controller("quizzes")
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  create(@Body(new ZodPipe(CreateQuizSchema)) dto: CreateQuizDto) {
    return this.quizService.create(dto);
  }

  @Get()
  findAll() {
    return this.quizService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.quizService.findOne(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.quizService.remove(id);
  }
}
