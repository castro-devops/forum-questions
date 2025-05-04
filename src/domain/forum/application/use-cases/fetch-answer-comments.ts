import { Either, right } from '@/core/either'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { IAnswerCommentsRepository } from '../repositories/contracts/answer-comments-repository'

interface IFetchAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

type IFetchAnswerCommentsUseCaseResponse = Either<
  null,
  {
    answerComments: AnswerComment[]
  }
>

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: IAnswerCommentsRepository) {}

  async process({
    answerId,
    page,
  }: IFetchAnswerCommentsUseCaseRequest): Promise<IFetchAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      })

    return right({
      answerComments,
    })
  }
}
