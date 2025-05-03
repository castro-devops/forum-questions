import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface IInstructorRequest {
  name: string;
}

export class Instructor extends Entity<IInstructorRequest> {

  static create(
    props: IInstructorRequest,
    id?: UniqueEntityID
  ) {
    const instructor = new Instructor(props, id);
    return instructor;
  }
  
}