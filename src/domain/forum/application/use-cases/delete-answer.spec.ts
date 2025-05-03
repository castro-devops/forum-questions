import { DeleteAnswerUseCase } from './delete-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'

describe('Delete Answer', () => {
  let answerRepository: InMemoryAnswersRepository
  let sut: DeleteAnswerUseCase

  beforeEach(() => {
    answerRepository = new InMemoryAnswersRepository()
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

    await sut.process({
      authorId: 'author-01',
      answerId: 'answer-01',
    })

    expect(answerRepository.items).toHaveLength(0)
  })

  it('should be not able delete a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-01'),
      },
      new UniqueEntityID('answer-01'),
    )

    await answerRepository.create(newAnswer)

    expect(() =>
      sut.process({
        authorId: 'author-02',
        answerId: 'answer-01',
      }),
    ).rejects.toBeInstanceOf(Error)

    expect(answerRepository.items).toHaveLength(1)
  })
})
