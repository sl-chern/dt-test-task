import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.option.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();

  await prisma.quiz.create({
    data: {
      title: "JavaScript Basics",
      questions: {
        create: [
          {
            text: "What is the result of typeof null?",
            type: "INPUT",
          },
          {
            text: "Is JavaScript a programming language?",
            type: "BOOLEAN",
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "HTML & CSS",
      questions: {
        create: [
          {
            text: "Which tag is used to create a hyperlink?",
            type: "INPUT",
          },
          {
            text: "Can CSS be written inside an HTML file?",
            type: "BOOLEAN",
          },
          {
            text: "Select valid CSS selectors:",
            type: "CHECKBOX",
            options: {
              create: [
                { text: ".class-name", isCorrect: true },
                { text: "#id-name", isCorrect: true },
                { text: "1invalid", isCorrect: false },
                { text: "*", isCorrect: true },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "TypeScript Basics",
      questions: {
        create: [
          {
            text: "What is TypeScript primarily used for?",
            type: "INPUT",
          },
          {
            text: "TypeScript is a superset of JavaScript?",
            type: "BOOLEAN",
          },
          {
            text: "Which of the following are TypeScript types?",
            type: "CHECKBOX",
            options: {
              create: [
                { text: "string", isCorrect: true },
                { text: "number", isCorrect: true },
                { text: "bool", isCorrect: false },
                { text: "any", isCorrect: true },
              ],
            },
          },
        ],
      },
    },
  });
}
main()
  .then(() => {
    return prisma.$disconnect();
  })
  .catch(() => {
    return prisma.$disconnect().then(() => process.exit(1));
  });
