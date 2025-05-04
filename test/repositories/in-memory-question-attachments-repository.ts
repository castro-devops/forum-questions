import { IQuestionAttachmentsRepository } from '@/domain/forum/application/repositories/contracts/question-attachments-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentsRepository
  implements IQuestionAttachmentsRepository
{
  public items: QuestionAttachment[] = []

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    const questionAttachments = this.items.filter(
      (item) => item.questionId.toString() !== questionId,
    )
    this.items = questionAttachments
  }

  async findManyByQuestionId(questionId: string) {
    const attachment = this.items.filter(
      (item) => item.questionId.toString() === questionId,
    )

    return attachment
  }
}
