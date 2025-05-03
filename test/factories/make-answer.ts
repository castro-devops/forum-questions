import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  IAnswerRequest,
  Answer,
} from '@/domain/forum/enterprise/entities/answer'

export function makeAnswer(
  override: Partial<IAnswerRequest> = {},
  id?: UniqueEntityID,
) {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      questionId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return answer
}
