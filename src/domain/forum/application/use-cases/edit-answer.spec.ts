import { EditAnswerUseCase } from './edit-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

describe('Edit Answer', () => {
  let answerRepository: InMemoryAnswersRepository
  let sut: EditAnswerUseCase

  beforeEach(() => {
    answerRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(answerRepository)
  })

  it('should be able edit a answer specific', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-01'),
      },
      new UniqueEntityID('answer-01'),
    )

    await answerRepository.create(newAnswer)

    await sut.process({
      answerId: newAnswer.id.toValue(),
      authorId: 'author-01',
      content: 'New Content Edited',
    })

    expect(answerRepository.items[0]).toMatchObject({
      content: 'New Content Edited',
    })
  })

  it('should be not able edit a answer from another user', async () => {
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
        content: 'New Content Edited',
      }),
    ).rejects.toBeInstanceOf(Error)

    expect(answerRepository.items).toHaveLength(1)
  })
})
