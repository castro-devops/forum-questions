import { Optional } from './../../core/@types/optional';
import { UniqueEntityID } from './../../core/entities/unique-entity-id';
import { Entity } from "../../core/entities/entity";

interface IAnswerRequest {
  authorId: UniqueEntityID;
  questionId: UniqueEntityID;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Answer extends Entity<IAnswerRequest> {

  get content() {
    return this.props.content;
  }

  static create(
    props: Optional<IAnswerRequest, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const answer = new Answer({
      ...props,
      createdAt: new Date()
    }, id);
    return answer;
  }
  
}