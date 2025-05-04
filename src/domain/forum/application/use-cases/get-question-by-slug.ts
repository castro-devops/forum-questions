import { Either, left, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { IQuestionsRepository } from '../repositories/contracts/questions-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error'

interface IgetQuestionBySlugUseCaseRequest {
  slug: string
}

type IgetQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>

export class GetQuestionBySlugUseCase {
  constructor(private questionRepository: IQuestionsRepository) {}

  async process({
    slug,
  }: IgetQuestionBySlugUseCaseRequest): Promise<IgetQuestionBySlugUseCaseResponse> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({
      question,
    })
  }
}
