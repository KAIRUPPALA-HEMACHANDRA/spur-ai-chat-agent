import { AppError } from "./app.error.js";

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(404, message);

    this.name = "NotFoundError";
  }
}