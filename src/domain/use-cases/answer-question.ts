import { UniqueEntityID } from './../../core/entities/unique-entity-id';
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
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId)
    });

    await this.answersRepository.create(answer);

    return answer;
  }

}