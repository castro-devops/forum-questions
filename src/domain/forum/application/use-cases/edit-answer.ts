import { IAnswersRepository } from '../repositories/contracts/answers-repository'

interface IEditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface IEditAnswerUseCaseResponse {}

export class EditAnswerUseCase {
  constructor(private answerRepository: IAnswersRepository) {}

  async process({
    authorId,
    answerId,
    content,
  }: IEditAnswerUseCaseRequest): Promise<IEditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed')
    }

    answer.content = content

    await this.answerRepository.save(answer)

    return {}
  }
}
