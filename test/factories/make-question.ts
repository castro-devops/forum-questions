import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  IQuestionRequest,
  Question,
} from '@/domain/forum/enterprise/entities/question'

export function makeQuestion(
  override: Partial<IQuestionRequest> = {},
  id?: UniqueEntityID,
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityID(),
      title: faker.lorem.sentence(3),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return question
}
