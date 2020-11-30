import { HttpStatus, HttpException } from "@nestjs/common";

export class InsufficientBalance extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }

  
}
