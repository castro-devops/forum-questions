import { Either, left, right } from '@/core/either'
import { IAnswerCommentsRepository } from '../repositories/contracts/answer-comments-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error'

interface IDeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}
type EmptyObject = Record<string, never>
type IDeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  EmptyObject
>

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: IAnswerCommentsRepository) {}

  async process({
    authorId,
    answerCommentId,
  }: IDeleteAnswerCommentUseCaseRequest): Promise<IDeleteAnswerCommentUseCaseResponse> {
    const answercomment =
      await this.answerCommentRepository.findById(answerCommentId)

    if (!answercomment) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answercomment.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.answerCommentRepository.delete(answercomment)

    return right({})
  }
}
