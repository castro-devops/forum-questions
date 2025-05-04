import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'

let questionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comment', () => {
  beforeEach(() => {
    questionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(questionCommentsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await questionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('question-1') }),
    )
    await questionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('question-1') }),
    )
    await questionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('question-1') }),
    )

    const result = await sut.process({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.isRight).toBeTruthy()
    expect(result.value?.questionComments).toHaveLength(3)
  })

  it('should be able to fetch painated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await questionCommentsRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityID('question-1') }),
      )
    }

    const result = await sut.process({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.isRight).toBeTruthy()
    expect(result.value?.questionComments).toHaveLength(2)
  })
})
