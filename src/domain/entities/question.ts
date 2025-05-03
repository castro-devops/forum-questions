import { randomUUID } from "node:crypto";
import { Slug } from "./value-objects/slug";

interface IQuestionRequest {
  title: string;
  slug: Slug;
  content: string;
  authorId: string;
}
export class Question {

  public id: string;
  public title: string;
  public slug: Slug;
  public content: string;
  public authorId: string;

  constructor(props : IQuestionRequest, id?: string) {
    this.id = id ?? randomUUID();
    this.title = props.title;
    this.slug = props.slug;
    this.content = props.content;
    this.authorId = props.authorId;
  }
  
}