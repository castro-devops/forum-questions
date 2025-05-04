import { DeleteQuestionUseCase } from './delete-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { makeQuestionAttachment } from 'test/factories/make-question-attachment'

describe('Delete Question', () => {
  let questionRepository: InMemoryQuestionsRepository
  let questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
  let sut: DeleteQuestionUseCase

  beforeEach(() => {
    questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    questionRepository = new InMemoryQuestionsRepository(
      questionAttachmentsRepository,
    )
    sut = new DeleteQuestionUseCase(questionRepository)
  })

  it('should be able delete a question specific', async () => {
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
      authorId: 'author-01',
      questionId: 'question-01',
    })

    expect(result.isRight).toBeTruthy()
    expect(questionRepository.items).toHaveLength(0)
    expect(questionAttachmentsRepository.items).toHaveLength(0)
  })

  it('should be not able delete a question from another user', async () => {
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
    })

    expect(result.isLeft).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
    expect(questionRepository.items).toHaveLength(1)
  })
})
