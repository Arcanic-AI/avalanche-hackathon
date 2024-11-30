import { HttpException, HttpStatus } from '@nestjs/common';

enum ErrorCode {
  CONO_API_ERROR = 1001,
}
export class ConoException extends HttpException {
  constructor(message: string) {
    super(message, ErrorCode.CONO_API_ERROR);
    this.name = 'ConoException';
  }
}
