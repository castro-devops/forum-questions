import { Entity } from "@/core/entities/entity";

interface IInstructorRequest {
  name: string;
}

export class Instructor extends Entity<IInstructorRequest> {

  get name() {
    return this.props.name;
  }

  constructor(props : IInstructorRequest, id?: string) {
    super(props, id);
  }
  
}