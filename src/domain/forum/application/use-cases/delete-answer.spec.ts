import { DeleteAnswerUseCase } from './delete-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { makeAnswerAttachment } from 'test/factories/make-answer-attchments'

describe('Delete Answer', () => {
  let answerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
  let answerRepository: InMemoryAnswersRepository
  let sut: DeleteAnswerUseCase

  beforeEach(() => {
    answerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    answerRepository = new InMemoryAnswersRepository(
      answerAttachmentsRepository,
    )
    answerRepository = new InMemoryAnswersRepository(
      answerAttachmentsRepository,
    )
    sut = new DeleteAnswerUseCase(answerRepository)
  })

  it('should be able delete a answer specific', async () => {
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
      authorId: 'author-01',
      answerId: 'answer-01',
    })

    expect(result.isRight()).toBeTruthy()
    expect(answerRepository.items).toHaveLength(0)
    expect(answerAttachmentsRepository.items).toHaveLength(0)
  })

  it('should be not able delete a answer from another user', async () => {
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
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
    expect(answerRepository.items).toHaveLength(1)
  })
})
