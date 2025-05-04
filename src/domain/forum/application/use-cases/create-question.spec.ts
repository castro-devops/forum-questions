import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

describe('Create Questions', () => {
  let questionRepository: InMemoryQuestionsRepository
  let questionAttachmentRepository: InMemoryQuestionAttachmentsRepository
  let sut: CreateQuestionUseCase

  beforeEach(() => {
    questionAttachmentRepository = new InMemoryQuestionAttachmentsRepository()
    questionRepository = new InMemoryQuestionsRepository(
      questionAttachmentRepository,
    )
    sut = new CreateQuestionUseCase(questionRepository)
  })

  it('should be able create a question', async () => {
    const result = await sut.process({
      authorId: 'au-01',
      title: 'Question Pertinent',
      content: 'Content question pertinent',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBeTruthy()
    expect(questionRepository.items[0]).toEqual(result.value?.question)
    expect(questionRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(questionRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])
  })
})
