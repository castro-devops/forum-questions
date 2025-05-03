import { AnswerQuestionUseCase } from "./answer-question";
import { IAnswersRepository } from "@/domain/repositories/@types/answers-repository";
import { Answer } from "@/domain/entities/answer";

const fakeAnswersRepository: IAnswersRepository = {
  create: async (answer: Answer) => {
    return;
  }
}

it("should be able create an answer", async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);
  const answer = await answerQuestion.process({
    instructorId: "in-01",
    questionId: "an-01",
    content: "An answer example"
  });

  expect(answer).toEqual(expect.objectContaining({
    content: "An answer example"
  }));
});