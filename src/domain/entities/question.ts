import { randomUUID } from "node:crypto";

interface IQuestionRequest {
  title: string;
  content: string;
  authorId: string;
}

export class Question {

  public id: string;
  public title: string;
  public content: string;
  public authorId: string;

    constructor(props : IQuestionRequest, id?: string) {
    this.id = id ?? randomUUID();
    this.title = props.title;
    this.content = props.content;
    this.authorId = props.authorId;
  }
  
}