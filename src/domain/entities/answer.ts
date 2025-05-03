import { Entity } from "../../core/entities/entity";

interface IAnswerRequest {
  content: string;
  authorId: string;
  questionId: string;
}

export class Answer extends Entity<IAnswerRequest> {

  get content() {
    return this.props.content;
  }

  get authorId() {
    return this.props.authorId;
  }

  get questionId() {
    return this.props.questionId;
  }

  constructor(
    props : IAnswerRequest,
    id?: string
  ) {
    super(props, id);
  }
  
}