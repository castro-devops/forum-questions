import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'

let questionRepository: InMemoryQuestionsRepository
let questionAttachmentRepository: InMemoryQuestionAttachmentsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    questionAttachmentRepository = new InMemoryQuestionAttachmentsRepository()
    questionRepository = new InMemoryQuestionsRepository(
      questionAttachmentRepository,
    )
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

    const result = await sut.process({
      page: 1,
    })

    expect(result.isRight).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.questions).toEqual([
        expect.objectContaining({ createdAt: new Date(2025, 0, 23) }),
        expect.objectContaining({ createdAt: new Date(2025, 0, 20) }),
        expect.objectContaining({ createdAt: new Date(2025, 0, 18) }),
      ])
    }
  })

  it('should be able to fetch painated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await questionRepository.create(makeQuestion())
    }

    const result = await sut.process({
      page: 2,
    })

    expect(result.isRight).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.questions).toHaveLength(2)
    }
  })
})
