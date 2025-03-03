import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {
  create() {
    return 'This action adds a new basket';
  }

  remove() {
    return `This action removes basket`;
  }
}
