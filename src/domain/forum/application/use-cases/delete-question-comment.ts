import { Either, left, right } from '@/core/either'
import { IQuestionCommentsRepository } from '../repositories/contracts/question-comments-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error'

interface IDeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

type IDeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  Record<string, never>
>

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepository: IQuestionCommentsRepository) {}

  async process({
    authorId,
    questionCommentId,
  }: IDeleteQuestionCommentUseCaseRequest): Promise<IDeleteQuestionCommentUseCaseResponse> {
    const questioncomment =
      await this.questionCommentRepository.findById(questionCommentId)

    if (!questioncomment) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== questioncomment.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionCommentRepository.delete(questioncomment)

    return right({})
  }
}
