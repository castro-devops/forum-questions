import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

describe('Answers Questions', () => {
  let answerRepository: InMemoryAnswersRepository
  let sut: AnswerQuestionUseCase

  beforeEach(() => {
    answerRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(answerRepository)
  })

  it('should be able create an answer', async () => {
    const { answer } = await sut.process({
      instructorId: 'in-01',
      questionId: 'an-01',
      content: 'An answer example',
    })

    expect(answer).toEqual(
      expect.objectContaining({
        content: 'An answer example',
      }),
    )
    expect(answer.id).toBeTruthy()
    expect(answerRepository.items[0].id).toEqual(answer.id)
  })
})
