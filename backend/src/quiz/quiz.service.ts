import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateQuizDto } from "src/quiz/dto/create-quiz.dto";

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateQuizDto) {
    return this.prisma.quiz.create({
      data: {
        title: dto.title,
        questions: {
          create: dto.questions.map((q) => ({
            text: q.text,
            type: q.type,
            options: q.options
              ? {
                  create: q.options.map((o) => ({
                    text: o.text,
                    isCorrect: o.isCorrect,
                  })),
                }
              : undefined,
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
  }

  async findAll() {
    const quizzes = await this.prisma.quiz.findMany({
      include: {
        _count: { select: { questions: true } },
      },
    });

    return quizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.title,
      questionCount: quiz._count.questions,
    }));
  }

  async findOne(id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!quiz) throw new NotFoundException("Quiz not found");
    return quiz;
  }

  async remove(id: string) {
    await this.prisma.quiz.delete({ where: { id } });
    return { message: "Quiz deleted successfully" };
  }
}
