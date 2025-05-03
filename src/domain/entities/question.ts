import { Optional } from './../../core/@types/optional';
import { UniqueEntityID } from './../../core/entities/unique-entity-id';
import { Slug } from "./value-objects/slug";
import { Entity } from "@/core/entities/entity";

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

  static create(
    props: Optional<IQuestionRequest, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const question = new Question({
      ...props,
      createdAt: new Date()
    }, id);
    return question;
  }
  
}