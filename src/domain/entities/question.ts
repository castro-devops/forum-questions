import { Entity } from './../../core/entities/entity';
import dayjs from 'dayjs';
import { Optional } from './../../core/@types/optional';
import { UniqueEntityID } from './../../core/entities/unique-entity-id';
import { Slug } from "./value-objects/slug";

interface IQuestionRequest {
  authorId: UniqueEntityID;
  bestAnswerId?: UniqueEntityID;
  title: string;
  content: string;
  slug: Slug;
  createdAt: Date;
  updatedAt?: Date;
}
export class Question extends Entity<IQuestionRequest> {

  get authorId() {
    return this.props.authorId;
  }
  
  get bestAnswerId() {
    return this.props.bestAnswerId;
  }
  
  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }
  
  get slug() {
    return this.props.slug;
  }
  
  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt) <= 3;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set title(title: string) {
    this.props.content = title;
    this.props.slug = Slug.process(title);
    this.touch();
  }

  set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
    this.props.bestAnswerId = bestAnswerId;
    this.touch();
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  static create(
    props: Optional<IQuestionRequest, 'createdAt' | 'slug'>,
    id?: UniqueEntityID
  ) {
    const question = new Question({
      ...props,
      slug: props.slug ?? Slug.process(props.title),
      createdAt: new Date()
    }, id);
    return question;
  }
  
}