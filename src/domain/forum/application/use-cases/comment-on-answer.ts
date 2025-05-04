import { AnswerComment } from './../../enterprise/entities/answer-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { IAnswersRepository } from '../repositories/contracts/answers-repository'
import { IAnswerCommentsRepository } from '../repositories/contracts/answer-comments-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error'

interface ICommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type ICommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>

export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: IAnswersRepository,
    private answerCommentsRepository: IAnswerCommentsRepository,
  ) {}

  async process({
    authorId,
    answerId,
    content,
  }: ICommentOnAnswerUseCaseRequest): Promise<ICommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.answerCommentsRepository.create(answerComment)

    return right({
      answerComment,
    })
  }
}
