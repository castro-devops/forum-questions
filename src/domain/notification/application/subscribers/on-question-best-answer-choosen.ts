import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { QuestionBestAnswerChooseEvent } from '@/domain/forum/enterprise/events/question-best-answer-choose-event'

export class OnQuestionBestAnswerChoosen implements EventHandler {
  constructor(
    private answersRepository: InMemoryAnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this),
      QuestionBestAnswerChooseEvent.name,
    )
  }

  private async sendQuestionBestAnswerNotification({
    question,
    bestAnswerId,
  }: QuestionBestAnswerChooseEvent) {
    const answer = await this.answersRepository.findById(
      bestAnswerId.toString(),
    )
    if (answer) {
      await this.sendNotification.process({
        recipientId: answer.authorId.toString(),
        title: `Sua resposta foi escolhida`,
        content: `A resposta que você enviou em "${question.title.substring(0, 20).concat('...')}" foi marcada como a melhor pelo autor.`,
      })
    }
  }
}
