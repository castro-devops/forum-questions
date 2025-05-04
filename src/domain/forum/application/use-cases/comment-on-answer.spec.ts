import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

describe('Comment on Answer', () => {
  let answerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
  let answerRepository: InMemoryAnswersRepository
  let answerCommentRepository: InMemoryAnswerCommentsRepository
  let sut: CommentOnAnswerUseCase

  beforeEach(() => {
    answerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    answerRepository = new InMemoryAnswersRepository(
      answerAttachmentsRepository,
    )
    answerRepository = new InMemoryAnswersRepository(
      answerAttachmentsRepository,
    )
    answerCommentRepository = new InMemoryAnswerCommentsRepository()
    sut = new CommentOnAnswerUseCase(answerRepository, answerCommentRepository)
  })

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await answerRepository.create(answer)

    await sut.process({
      authorId: answer.authorId.toString(),
      answerId: answer.id.toString(),
      content: 'Comentário de teste em uma resposta.',
    })

    expect(answerCommentRepository.items[0].content).toEqual(
      'Comentário de teste em uma resposta.',
    )
  })
})
