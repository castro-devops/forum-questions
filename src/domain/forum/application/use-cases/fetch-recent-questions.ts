import { Either, left, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { IQuestionsRepository } from '../repositories/contracts/questions-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error'

interface IFetchRecentQuestionsUseCaseRequest {
  page: number
}

type IFetchRecentQuestionsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questions: Question[]
  }
>

export class FetchRecentQuestionsUseCase {
  constructor(private questionRepository: IQuestionsRepository) {}

  async process({
    page,
  }: IFetchRecentQuestionsUseCaseRequest): Promise<IFetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page })

    if (!questions) {
      return left(new ResourceNotFoundError())
    }

    return right({
      questions,
    })
  }
}
