import { randomUUID } from "node:crypto";

interface IInstructorRequest {
  name: string;
}

export class Instructor {

  public id: string;
  public name: string;

  constructor(props : IInstructorRequest, id?: string) {
    this.id = id ?? randomUUID();
    this.name = props.name;
  }
  
}