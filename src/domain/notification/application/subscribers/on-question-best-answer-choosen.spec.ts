import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notifications-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { makeQuestion } from 'test/factories/make-question'
import { MockInstance, vi } from 'vitest'
import { waitFor } from 'test/utils/wait-for'
import { OnQuestionBestAnswerChoosen } from './on-question-best-answer-choosen'

let questionsRepository: InMemoryQuestionsRepository
let questionsAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sendNotification: SendNotificationUseCase
let noficiationRepository: InMemoryNotificationRepository
let attachmentRepository: InMemoryAnswerAttachmentsRepository
let answersRepository: InMemoryAnswersRepository

let sendNotificationExecuteSpy: MockInstance

describe('On Question Best Answer Choosen', () => {
  beforeEach(() => {
    noficiationRepository = new InMemoryNotificationRepository()
    questionsAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    questionsRepository = new InMemoryQuestionsRepository(
      questionsAttachmentsRepository,
    )
    sendNotification = new SendNotificationUseCase(noficiationRepository)
    attachmentRepository = new InMemoryAnswerAttachmentsRepository()
    answersRepository = new InMemoryAnswersRepository(attachmentRepository)

    sendNotificationExecuteSpy = vi.spyOn(sendNotification, 'process')

    new OnQuestionBestAnswerChoosen(answersRepository, sendNotification)
  })

  it('should send a notification when question has new best answer choosen', async () => {
    const question = makeQuestion()

    const answer = makeAnswer({
      questionId: question.id,
    })

    questionsRepository.create(question)
    answersRepository.create(answer)

    question.bestAnswerId = answer.id

    questionsRepository.save(question)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
