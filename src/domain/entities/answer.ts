import { randomUUID } from "node:crypto";

interface IAnswerRequest {
  content: string;
  authorId: string;
  questionId: string;
}

export class Answer {

  public id: string;
  public content: string;
  public authorId: string;
  public questionId: string;

  constructor(
    props : IAnswerRequest,
    id?: string
  ) {
    this.id = id ?? randomUUID();
    this.content = props.content;
    this.authorId = props.authorId;
    this.questionId = props.questionId;
  }
  
}