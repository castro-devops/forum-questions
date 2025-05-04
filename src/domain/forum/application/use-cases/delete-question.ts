import { Either, left, right } from '@/core/either'
import { IQuestionsRepository } from '../repositories/contracts/questions-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error'

interface IDeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

type IDeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  Record<string, never>
>

export class DeleteQuestionUseCase {
  constructor(private questionRepository: IQuestionsRepository) {}

  async process({
    authorId,
    questionId,
  }: IDeleteQuestionUseCaseRequest): Promise<IDeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionRepository.delete(question)

    return right({})
  }
}
