import { Module } from "@nestjs/common";
import { QuizModule } from "src/quiz/quiz.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import appConfig from "./config/app.config";

@Module({
  imports: [
    QuizModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: [".env"],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
