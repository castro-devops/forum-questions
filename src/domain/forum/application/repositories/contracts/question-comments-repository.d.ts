import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export interface IQuestionCommentsRepository {
  create(questioncomment: QuestionComment): Promise<void>
}
