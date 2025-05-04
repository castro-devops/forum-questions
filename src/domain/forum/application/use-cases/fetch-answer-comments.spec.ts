import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'

let answerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comment', () => {
  beforeEach(() => {
    answerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(answerCommentsRepository)
  })

  it('should be able to fetch recent answers', async () => {
    await answerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID('answer-1') }),
    )
    await answerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID('answer-1') }),
    )
    await answerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID('answer-1') }),
    )

    const result = await sut.process({
      answerId: 'answer-1',
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.answerComments).toHaveLength(3)
  })

  it('should be able to fetch painated recent answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await answerCommentsRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityID('answer-1') }),
      )
    }

    const result = await sut.process({
      answerId: 'answer-1',
      page: 2,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.answerComments).toHaveLength(2)
  })
})
