import { Either, right } from '@/core/either'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { IQuestionCommentsRepository } from '../repositories/contracts/question-comments-repository'

interface IFetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

type IFetchQuestionCommentsUseCaseResponse = Either<
  null,
  {
    questionComments: QuestionComment[]
  }
>

export class FetchQuestionCommentsUseCase {
  constructor(
    private questionCommentsRepository: IQuestionCommentsRepository,
  ) {}

  async process({
    questionId,
    page,
  }: IFetchQuestionCommentsUseCaseRequest): Promise<IFetchQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({
      questionComments,
    })
  }
}
