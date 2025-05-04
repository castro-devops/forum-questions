import { Either, left, right } from '@/core/either'
import { IAnswersRepository } from '../repositories/contracts/answers-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error'

interface IDeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

type IDeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  Record<string, never>
>

export class DeleteAnswerUseCase {
  constructor(private answerRepository: IAnswersRepository) {}

  async process({
    authorId,
    answerId,
  }: IDeleteAnswerUseCaseRequest): Promise<IDeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.answerRepository.delete(answer)

    return right({})
  }
}
