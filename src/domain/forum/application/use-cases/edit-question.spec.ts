import { EditQuestionUseCase } from './edit-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

describe('Edit Question', () => {
  let questionRepository: InMemoryQuestionsRepository
  let sut: EditQuestionUseCase

  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(questionRepository)
  })

  it('should be able edit a question specific', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-01'),
      },
      new UniqueEntityID('question-01'),
    )

    await questionRepository.create(newQuestion)

    await sut.process({
      questionId: newQuestion.id.toValue(),
      authorId: 'author-01',
      title: 'Título de pergunta teste',
      content: 'New Content Edited',
    })

    expect(questionRepository.items[0]).toMatchObject({
      title: 'Título de pergunta teste',
      content: 'New Content Edited',
    })
  })

  it('should be not able edit a question from another user', async () => {
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
        title: 'Título de pergunta teste',
        content: 'New Content Edited',
      }),
    ).rejects.toBeInstanceOf(Error)

    expect(questionRepository.items).toHaveLength(1)
  })
})
