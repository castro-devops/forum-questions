import { Optional } from '@/core/@types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Comment, ICommentProps } from './comment'

export interface IAnswerCommentRequest extends ICommentProps {
  answerId: UniqueEntityID
}

export class AnswerComment extends Comment<IAnswerCommentRequest> {
  get answerId() {
    return this.props.answerId
  }

  static create(
    props: Optional<IAnswerCommentRequest, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return answerComment
  }
}
