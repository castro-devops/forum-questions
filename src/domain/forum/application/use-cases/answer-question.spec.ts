import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

describe('Answers Questions', () => {
  let answerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
  let answerRepository: InMemoryAnswersRepository
  let sut: AnswerQuestionUseCase

  beforeEach(() => {
    answerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    answerRepository = new InMemoryAnswersRepository(
      answerAttachmentsRepository,
    )
    answerRepository = new InMemoryAnswersRepository(
      answerAttachmentsRepository,
    )
    sut = new AnswerQuestionUseCase(answerRepository)
  })

  it('should be able create an answer', async () => {
    const result = await sut.process({
      instructorId: 'in-01',
      questionId: 'an-01',
      content: 'An answer example',
      attachmentsIds: ['1', '2'],
    })

    expect(result.value?.answer).toEqual(
      expect.objectContaining({
        content: 'An answer example',
      }),
    )
    expect(result.isRight()).toBeTruthy()
    expect(answerRepository.items[0]).toEqual(result.value?.answer)
    expect(answerRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(answerRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])
  })
})
