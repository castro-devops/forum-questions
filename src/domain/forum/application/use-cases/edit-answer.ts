import { Either, left, right } from '@/core/either'
import { IAnswersRepository } from '../repositories/contracts/answers-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error'
import { IAnswerAttachmentsRepository } from '../repositories/contracts/answer-attachments-repository'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface IEditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
  attachmentsIds: string[]
}

type IEditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  Record<string, never>
>

export class EditAnswerUseCase {
  constructor(
    private answerRepository: IAnswersRepository,
    private answerAttachmentRepository: IAnswerAttachmentsRepository,
  ) {}

  async process({
    authorId,
    answerId,
    content,
    attachmentsIds,
  }: IEditAnswerUseCaseRequest): Promise<IEditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentAnswerAttachments =
      await this.answerAttachmentRepository.findManyByAnswerId(answerId)

    const answerAttachmentsList = new AnswerAttachmentList(
      currentAnswerAttachments,
    )

    const answerAttachments = attachmentsIds.map((attachmentsId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentsId),
        answerId: answer.id,
      })
    })

    answerAttachmentsList.update(answerAttachments)

    answer.content = content
    answer.attachments = answerAttachmentsList

    await this.answerRepository.save(answer)

    return right({})
  }
}
