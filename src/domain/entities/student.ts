import { randomUUID } from "node:crypto";

interface IStudentRequest {
  name: string;
}

export class Student {

  public id: string;
  public name: string;

  constructor(props : IStudentRequest, id?: string) {
    this.id = id ?? randomUUID();
    this.name = props.name;
  }
  
}