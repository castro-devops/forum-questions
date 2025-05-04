import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error'

describe('Delete Answer Comment', () => {
  let answerCommentRepository: InMemoryAnswerCommentsRepository
  let sut: DeleteAnswerCommentUseCase

  beforeEach(() => {
    answerCommentRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(answerCommentRepository)
  })

  it('should be able to delete a answer comment', async () => {
    const answerComment = makeAnswerComment()

    await answerCommentRepository.create(answerComment)

    await sut.process({
      authorId: answerComment.authorId.toString(),
      answerCommentId: answerComment.id.toString(),
    })

    expect(answerCommentRepository.items).toHaveLength(0)
  })

  it('should not be able to delete another user a answer comment', async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityID('au-01'),
    })

    await answerCommentRepository.create(answerComment)
    const result = await sut.process({
      authorId: new UniqueEntityID('au-02').toString(),
      answerCommentId: answerComment.id.toString(),
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
