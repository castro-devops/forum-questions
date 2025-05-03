import { Answer } from '../../enterprise/entities/answer'
import { IAnswersRepository } from '../repositories/contracts/answers-repository'

interface IFetchQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

interface IFetchQuestionAnswersUseCaseResponse {
  answers: Answer[]
}

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
      throw new Error('Question not found.')
    }

    return {
      answers,
    }
  }
}
