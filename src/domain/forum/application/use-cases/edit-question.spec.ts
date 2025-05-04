import { EditQuestionUseCase } from './edit-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { makeQuestionAttachment } from 'test/factories/make-question-attachment'

describe('Edit Question', () => {
  let questionRepository: InMemoryQuestionsRepository
  let questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
  let sut: EditQuestionUseCase

  beforeEach(() => {
    questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    questionRepository = new InMemoryQuestionsRepository(
      questionAttachmentsRepository,
    )
    questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    sut = new EditQuestionUseCase(
      questionRepository,
      questionAttachmentsRepository,
    )
  })

  it('should be able edit a question specific', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-01'),
      },
      new UniqueEntityID('question-01'),
    )

    await questionRepository.create(newQuestion)

    questionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    )

    const result = await sut.process({
      questionId: newQuestion.id.toValue(),
      authorId: 'author-01',
      title: 'Título de pergunta teste',
      content: 'New Content Edited',
      attachmentsIds: ['1', '3'],
    })

    expect(result.isRight).toBeTruthy()
    expect(questionRepository.items[0]).toMatchObject({
      title: 'Título de pergunta teste',
      content: 'New Content Edited',
    })
    expect(questionRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(questionRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('3') }),
    ])
  })

  it('should be not able edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-01'),
      },
      new UniqueEntityID('question-01'),
    )

    await questionRepository.create(newQuestion)

    const result = await sut.process({
      authorId: 'author-02',
      questionId: 'question-01',
      title: 'Título de pergunta teste',
      content: 'New Content Edited',
      attachmentsIds: ['1'],
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
    expect(questionRepository.items).toHaveLength(1)
  })
})
