// import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeNotification } from 'test/factories/make-notification'
import { ReadNotificationUseCase } from './read-notification'
import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notifications-repository'

describe('Send Notification', () => {
  let notificationsRepository: InMemoryNotificationRepository
  let sut: ReadNotificationUseCase

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationRepository()
    sut = new ReadNotificationUseCase(notificationsRepository)
  })

  it('should be able read a notification', async () => {
    const newNotification = makeNotification()

    await notificationsRepository.create(newNotification)

    const result = await sut.process({
      notificationId: newNotification.id.toString(),
      recipientId: newNotification.recipientId.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(notificationsRepository.items[0]).toEqual(
        result.value.notification,
      )
    }
  })
})
