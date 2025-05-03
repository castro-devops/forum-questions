import { Slug } from "./value-objects/slug";
import { Entity } from "@/core/entities/entity";

interface IQuestionRequest {
  title: string;
  slug: Slug;
  content: string;
  authorId: string;
}
export class Question extends Entity<IQuestionRequest> {

  get title() {
    return this.props.title;

  }
  get slug() {
    return this.props.slug;

  }
  get content() {
    return this.props.content;

  }
  get authorId() {
    return this.props.authorId;

  }

  constructor(props : IQuestionRequest, id?: string) {
    super(props, id);
  }
  
}