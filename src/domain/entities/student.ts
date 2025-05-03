import { Entity } from "@/core/entities/entity";

interface IStudentRequest {
  name: string;
}

export class Student extends Entity<IStudentRequest> {

  get name() {
    return this.props.name;
  }

  constructor(props : IStudentRequest, id?: string) {
    super(props, id);
  }

}