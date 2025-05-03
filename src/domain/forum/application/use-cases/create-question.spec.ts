import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

describe('Create Questions', () => {
  let questionRepository: InMemoryQuestionsRepository
  let sut: CreateQuestionUseCase

  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(questionRepository)
  })

  it('should be able create a question', async () => {
    const { question } = await sut.process({
      authorId: 'au-01',
      title: 'Question Pertinent',
      content: 'Content question pertinent',
    })

    expect(question.id).toBeTruthy()
  })
})
