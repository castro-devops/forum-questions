import { Either, left, right } from '@/core/either'
import { IQuestionsRepository } from '../repositories/contracts/questions-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error'
import { IQuestionAttachmentsRepository } from '../repositories/contracts/question-attachments-repository'
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface IEditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type IEditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  Record<string, never>
>

export class EditQuestionUseCase {
  constructor(
    private questionRepository: IQuestionsRepository,
    private questionAttachmentRepository: IQuestionAttachmentsRepository,
  ) {}

  async process({
    authorId,
    questionId,
    title,
    content,
    attachmentsIds,
  }: IEditQuestionUseCaseRequest): Promise<IEditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentQuestionAttachments =
      await this.questionAttachmentRepository.findManyByQuestionId(questionId)

    const questionAttachmentsList = new QuestionAttachmentList(
      currentQuestionAttachments,
    )

    const questionAttachments = attachmentsIds.map((attachmentsId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentsId),
        questionId: question.id,
      })
    })

    questionAttachmentsList.update(questionAttachments)

    question.title = title
    question.content = content
    question.attachments = questionAttachmentsList

    await this.questionRepository.save(question)

    return right({})
  }
}
