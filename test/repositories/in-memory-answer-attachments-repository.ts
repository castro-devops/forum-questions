import { IAnswerAttachmentsRepository } from '@/domain/forum/application/repositories/contracts/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentsRepository
  implements IAnswerAttachmentsRepository
{
  public items: AnswerAttachment[] = []

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() !== answerId,
    )
    this.items = answerAttachments
  }

  async findManyByAnswerId(answerId: string) {
    const attachment = this.items.filter(
      (item) => item.answerId.toString() === answerId,
    )

    return attachment
  }
}
