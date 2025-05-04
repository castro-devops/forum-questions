import { PaginationParams } from '@/core/repositories/pagination-params'
import { IAnswerCommentsRepository } from '@/domain/forum/application/repositories/contracts/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements IAnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toString() === id)
    if (!answer) return null
    return answer
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const comment = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)

    return comment
  }

  async create(answercomment: AnswerComment) {
    this.items.push(answercomment)
  }

  async delete(answerComment: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === answerComment.id,
    )

    this.items.splice(itemIndex, 1)
  }
}
