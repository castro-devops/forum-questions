import { EditAnswerUseCase } from './edit-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { makeAnswerAttachment } from 'test/factories/make-answer-attchments'

describe('Edit Answer', () => {
  let answerRepository: InMemoryAnswersRepository
  let answerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
  let sut: EditAnswerUseCase

  beforeEach(() => {
    answerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    answerRepository = new InMemoryAnswersRepository(
      answerAttachmentsRepository,
    )
    sut = new EditAnswerUseCase(answerRepository, answerAttachmentsRepository)
  })

  it('should be able edit a answer specific', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-01'),
      },
      new UniqueEntityID('answer-01'),
    )

    await answerRepository.create(newAnswer)

    answerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    )

    const result = await sut.process({
      answerId: newAnswer.id.toValue(),
      authorId: 'author-01',
      content: 'New Content Edited',
      attachmentsIds: ['1', '3'],
    })

    expect(result.isRight()).toBeTruthy()
    expect(answerRepository.items[0]).toMatchObject({
      content: 'New Content Edited',
    })
    expect(answerRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(answerRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('3') }),
    ])
  })

  it('should not be able edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-01'),
      },
      new UniqueEntityID('answer-01'),
    )

    await answerRepository.create(newAnswer)

    const result = await sut.process({
      authorId: 'author-02',
      answerId: 'answer-01',
      content: 'New Content Edited',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isLeft).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
    expect(answerRepository.items).toHaveLength(1)
  })
})
