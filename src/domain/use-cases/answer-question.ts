import { Answer } from "../entities/answer";
import { IAnswersRepository } from "../repositories/@types/answers-repository";

interface IAnswerQuestionUseCaseProps {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {

  constructor(
    private answersRepository: IAnswersRepository
  ) {}

  async process({
    instructorId: authorId, 
    questionId,
    content
  } : IAnswerQuestionUseCaseProps) {
    const answer = new Answer({
      content,
      authorId,
      questionId });

    await this.answersRepository.create(answer);

    return answer;
  }

}