import { Either, left, right } from '@/core/either'
import { Notification } from '../../enterprise/entities/notification'
import { INotificationsRepository } from '../repositories/notifications-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error'

interface IReadNotificationUseCaseRequest {
  recipientId: string
  notificationId: string
}

type IReadNotificationUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification
  }
>

export class ReadNotificationUseCase {
  constructor(private notificationRepository: INotificationsRepository) {}

  async process({
    recipientId,
    notificationId,
  }: IReadNotificationUseCaseRequest): Promise<IReadNotificationUseCaseResponse> {
    const notification =
      await this.notificationRepository.findById(notificationId)

    if (!notification) {
      return left(new ResourceNotFoundError())
    }

    if (notification.recipientId.toString() !== recipientId) {
      return left(new NotAllowedError())
    }

    notification.read()

    await this.notificationRepository.save(notification)

    return right({
      notification,
    })
  }
}
