import { IQuestionCommentsRepository } from '@/domain/forum/application/repositories/contracts/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements IQuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async create(questioncomment: QuestionComment) {
    this.items.push(questioncomment)
  }
}
