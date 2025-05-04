import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'

describe('Get Question By Slug', () => {
  let questionRepository: InMemoryQuestionsRepository
  let questionAttachmentRepository: InMemoryQuestionAttachmentsRepository
  let sut: GetQuestionBySlugUseCase

  beforeEach(() => {
    questionAttachmentRepository = new InMemoryQuestionAttachmentsRepository()
    questionRepository = new InMemoryQuestionsRepository(
      questionAttachmentRepository,
    )
    sut = new GetQuestionBySlugUseCase(questionRepository)
  })

  it('should be able get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('title-example'),
    })

    await questionRepository.create(newQuestion)

    const result = await sut.process({
      slug: 'title-example',
    })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.question.title).toEqual(newQuestion.title)
    }
  })
})
