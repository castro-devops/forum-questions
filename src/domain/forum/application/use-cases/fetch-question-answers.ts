import { Either, left, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { IAnswersRepository } from '../repositories/contracts/answers-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error'

interface IFetchQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

type IFetchQuestionAnswersUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answers: Answer[]
  }
>

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: IAnswersRepository) {}

  async process({
    questionId,
    page,
  }: IFetchQuestionAnswersUseCaseRequest): Promise<IFetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    if (!answers) {
      return left(new ResourceNotFoundError())
    }

    return right({
      answers,
    })
  }
}
