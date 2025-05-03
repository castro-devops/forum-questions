import { Entity } from './../../core/entities/entity';
import { UniqueEntityID } from './../../core/entities/unique-entity-id';

interface IStudentRequest {
  name: string;
}

export class Student extends Entity<IStudentRequest> {

  static create(
    props: IStudentRequest,
    id?: UniqueEntityID
  ) {
    const student = new Student(props, id);
    return student;
  }

}