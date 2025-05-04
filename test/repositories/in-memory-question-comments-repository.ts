import { PaginationParams } from '@/core/repositories/pagination-params'
import { IQuestionCommentsRepository } from '@/domain/forum/application/repositories/contracts/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements IQuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async findById(id: string) {
    const comment = this.items.find((item) => item.id.toString() === id)
    if (!comment) return null
    return comment
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const comment = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return comment
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async delete(questionComment: QuestionComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === questionComment.id,
    )

    this.items.splice(itemIndex, 1)
  }
}
