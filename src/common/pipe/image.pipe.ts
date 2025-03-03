import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class ImageValidationPipe implements PipeTransform<any> {
  private readonly allowedExtensions = [
    '.jpeg',
    '.jpg',
    '.png',
    '.svg',
    '.heic',
  ];
  private readonly allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/heic',
  ];

  transform(value: any) {
    if (!value) {
      throw new BadRequestException('File is required.');
    }

    if (Array.isArray(value)) {
      value.forEach((file) => this.validateFile(file));
    } else {
      this.validateFile(value);
    }

    return value;
  }

  private validateFile(file: Express.Multer.File) {
    if (!file.originalname || !file.mimetype) {
      throw new BadRequestException('Invalid file format.');
    }

    const fileExtension = extname(file.originalname).toLowerCase();
    if (!this.allowedExtensions.includes(fileExtension)) {
      throw new BadRequestException(
        `Invalid file type. Allowed extensions: ${this.allowedExtensions.join(', ')}`,
      );
    }

    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid MIME type. Allowed types: ${this.allowedMimeTypes.join(', ')}`,
      );
    }
  }
}
