// import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { SendNotificationUseCase } from './send-notification'
import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notifications-repository'

describe('Send Notification', () => {
  let notificationsRepository: InMemoryNotificationRepository
  let sut: SendNotificationUseCase

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationRepository()
    sut = new SendNotificationUseCase(notificationsRepository)
  })

  it('should be able send a notification', async () => {
    const result = await sut.process({
      recipientId: 'au-01',
      title: 'Notification title',
      content: 'Content of the notification.',
    })

    expect(result.isRight()).toBeTruthy()
    expect(notificationsRepository.items[0]).toEqual(result.value?.notification)
  })
})
