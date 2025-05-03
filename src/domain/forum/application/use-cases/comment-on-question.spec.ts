import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'

describe('Comment on Question', () => {
  let questionRepository: InMemoryQuestionsRepository
  let questionCommentRepository: InMemoryQuestionCommentsRepository
  let sut: CommentOnQuestionUseCase

  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    questionCommentRepository = new InMemoryQuestionCommentsRepository()
    sut = new CommentOnQuestionUseCase(
      questionRepository,
      questionCommentRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await questionRepository.create(question)

    await sut.process({
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
      content: 'Comentário de teste em uma questão.',
    })

    expect(questionCommentRepository.items[0].content).toEqual(
      'Comentário de teste em uma questão.',
    )
  })
})
