import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

describe('Create Questions', () => {
  let questionRepository: InMemoryQuestionsRepository
  let createQuestion: CreateQuestionUseCase

  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    createQuestion = new CreateQuestionUseCase(questionRepository)
  })

  it('should be able create a question', async () => {
    const { question } = await createQuestion.process({
      authorId: 'au-01',
      title: 'Question Pertinent',
      content: 'Content question pertinent',
    })

    expect(question.id).toBeTruthy()
  })
})
