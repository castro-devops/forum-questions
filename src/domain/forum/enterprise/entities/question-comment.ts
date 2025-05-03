import { Optional } from '@/core/@types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Comment, ICommentProps } from './comment'

export interface IQuestionCommentRequest extends ICommentProps {
  questionId: UniqueEntityID
}

export class QuestionComment extends Comment<IQuestionCommentRequest> {
  get questionId() {
    return this.props.questionId
  }

  static create(
    props: Optional<IQuestionCommentRequest, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return questionComment
  }
}
