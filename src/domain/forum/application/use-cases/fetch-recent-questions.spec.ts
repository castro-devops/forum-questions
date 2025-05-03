import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'
import { makeQuestion } from 'test/factories/make-question'

let questionRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(questionRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await questionRepository.create(
      makeQuestion({ createdAt: new Date(2025, 0, 20) }),
    )
    await questionRepository.create(
      makeQuestion({ createdAt: new Date(2025, 0, 18) }),
    )
    await questionRepository.create(
      makeQuestion({ createdAt: new Date(2025, 0, 23) }),
    )

    const { questions } = await sut.process({
      page: 1,
    })

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2025, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2025, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2025, 0, 18) }),
    ])
  })

  it('should be able to fetch painated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await questionRepository.create(makeQuestion())
    }

    const { questions } = await sut.process({
      page: 2,
    })

    expect(questions).toHaveLength(2)
  })
})
