import { Question } from '../../enterprise/entities/question'
import { IQuestionsRepository } from '../repositories/contracts/questions-repository'

interface IFetchRecentQuestionsUseCaseRequest {
  page: number
}

interface IFetchRecentQuestionsUseCaseResponse {
  questions: Question[]
}

export class FetchRecentQuestionsUseCase {
  constructor(private questionRepository: IQuestionsRepository) {}

  async process({
    page,
  }: IFetchRecentQuestionsUseCaseRequest): Promise<IFetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page })

    if (!questions) {
      throw new Error('Question not found.')
    }

    return {
      questions,
    }
  }
}
