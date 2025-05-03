import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'

describe('Get Question By Slug', () => {
  let questionRepository: InMemoryQuestionsRepository
  let sut: GetQuestionBySlugUseCase

  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(questionRepository)
  })

  it('should be able get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('title-example'),
    })

    await questionRepository.create(newQuestion)

    const { question } = await sut.process({
      slug: 'title-example',
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
  })
})
