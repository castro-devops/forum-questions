import { Answer } from "@/domain/entities/answer";

export interface IAnswersRepository {
  create(answer: Answer): Promise<void>;
}
