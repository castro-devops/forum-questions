import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { makeQuestion } from 'test/factories/make-question'

describe('Choose Question Best Answer', () => {
  let questionRepository: InMemoryQuestionsRepository
  let answerRepository: InMemoryAnswersRepository
  let sut: ChooseQuestionBestAnswerUseCase

  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    answerRepository = new InMemoryAnswersRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      answerRepository,
      questionRepository,
    )
  })

  it('should be able delete a answer specific', async () => {
    const question = makeQuestion()

    const answer = makeAnswer({
      questionId: question.id,
    })

    await questionRepository.create(question)
    await answerRepository.create(answer)

    await sut.process({
      authorId: question.authorId.toString(),
      answerId: answer.id.toString(),
    })

    expect(questionRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('should be not able choose question best answer another user', async () => {
    const question = makeQuestion()

    const answer = makeAnswer({
      questionId: question.id,
    })

    await questionRepository.create(question)
    await answerRepository.create(answer)

    await expect(
      sut.process({
        authorId: new UniqueEntityID().toString(),
        answerId: answer.id.toString(),
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
