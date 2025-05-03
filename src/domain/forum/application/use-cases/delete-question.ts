import { IQuestionsRepository } from '../repositories/contracts/questions-repository'

interface IDeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

interface IDeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: IQuestionsRepository) {}

  async process({
    authorId,
    questionId,
  }: IDeleteQuestionUseCaseRequest): Promise<IDeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.questionRepository.delete(question)

    return {}
  }
}
