import { Question } from '../../enterprise/entities/question'
import { IQuestionsRepository } from '../repositories/contracts/questions-repository'

interface IgetQuestionBySlugUseCaseRequest {
  slug: string
}

interface IgetQuestionBySlugUseCaseResponse {
  question: Question
}

export class GetQuestionBySlugUseCase {
  constructor(private questionRepository: IQuestionsRepository) {}

  async process({
    slug,
  }: IgetQuestionBySlugUseCaseRequest): Promise<IgetQuestionBySlugUseCaseResponse> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found.')
    }

    return {
      question,
    }
  }
}
