import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  executeSeed(): string {
    return `This action executes the seed`;
  }
}
