import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let answerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let answersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    answerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    answersRepository = new InMemoryAnswersRepository(
      answerAttachmentsRepository,
    )
    sut = new FetchQuestionAnswersUseCase(answersRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await answersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-1') }),
    )
    await answersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-1') }),
    )
    await answersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-1') }),
    )

    const result = await sut.process({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.isRight).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.answers).toHaveLength(3)
    }
  })

  it('should be able to fetch painated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await answersRepository.create(
        makeAnswer({ questionId: new UniqueEntityID('question-1') }),
      )
    }

    const result = await sut.process({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.isRight).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.answers).toHaveLength(2)
    }
  })
})
