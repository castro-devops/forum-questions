import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

describe('Delete Question Comment', () => {
  let questionCommentRepository: InMemoryQuestionCommentsRepository
  let sut: DeleteQuestionCommentUseCase

  beforeEach(() => {
    questionCommentRepository = new InMemoryQuestionCommentsRepository()
    sut = new DeleteQuestionCommentUseCase(questionCommentRepository)
  })

  it('should be able to delete a question comment', async () => {
    const questionComment = makeQuestionComment()

    await questionCommentRepository.create(questionComment)

    const result = await sut.process({
      authorId: questionComment.authorId.toString(),
      questionCommentId: questionComment.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(questionCommentRepository.items).toHaveLength(0)
  })

  it('should not be able to delete another user a question comment', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityID('au-01'),
    })

    await questionCommentRepository.create(questionComment)

    const result = await sut.process({
      authorId: new UniqueEntityID('au-02').toString(),
      questionCommentId: questionComment.id.toString(),
    })

    expect(result.isLeft).toBeTruthy()
    expect(result.value).toBeInstanceOf(Error)
  })
})
