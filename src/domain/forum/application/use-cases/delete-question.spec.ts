import { DeleteQuestionUseCase } from './delete-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

describe('Delete Question', () => {
  let questionRepository: InMemoryQuestionsRepository
  let sut: DeleteQuestionUseCase

  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(questionRepository)
  })

  it('should be able delete a question specific', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-01'),
      },
      new UniqueEntityID('question-01'),
    )

    await questionRepository.create(newQuestion)

    await sut.process({
      authorId: 'author-01',
      questionId: 'question-01',
    })

    expect(questionRepository.items).toHaveLength(0)
  })

  it('should be not able delete a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-01'),
      },
      new UniqueEntityID('question-01'),
    )

    await questionRepository.create(newQuestion)

    expect(() =>
      sut.process({
        authorId: 'author-02',
        questionId: 'question-01',
      }),
    ).rejects.toBeInstanceOf(Error)

    expect(questionRepository.items).toHaveLength(1)
  })
})
