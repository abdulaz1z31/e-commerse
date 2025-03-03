import { Injectable, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { join, extname } from 'path';
import { promises as fs } from 'fs';

@Injectable()
export class FileService {
  private readonly uploadsFolder = join(process.cwd(), 'uploads');

  constructor() {
    fs.mkdir(this.uploadsFolder, { recursive: true }).catch(() => null);
  }

  async saveFiles(files: Express.Multer.File[]): Promise<string[]> {
    try {
      if (!files || files.length === 0) {
        throw new BadRequestException('No files provided');
      }
      await fs.mkdir(this.uploadsFolder, { recursive: true });

      const fileNames: string[] = await Promise.all(
        files.map(async (file) => {
          const fileName = `${uuidv4()}${extname(file.originalname).toLowerCase()}`;
          const filePath = join(this.uploadsFolder, fileName);

          await fs.writeFile(filePath, file.buffer);

          return fileName;
        }),
      );

      return fileNames;
    } catch (error) {
      throw new BadRequestException(`Error saving files: ${error.message}`);
    }
  }

  async saveFile(file: Express.Multer.File): Promise<string> {
    try {
      await fs.mkdir(this.uploadsFolder, { recursive: true });

      const fileName = `${uuidv4()}${extname(file.originalname).toLowerCase()}`;
      const filePath = join(this.uploadsFolder, fileName);

      await fs.writeFile(filePath, file.buffer);

      return fileName;
    } catch (error) {
      throw new BadRequestException(`Error saving file: ${error.message}`);
    }
  }

  async deleteFiles(fileNames: string[]): Promise<boolean> {
    try {
      const deletePromises = fileNames.map((fileName) =>
        this.deleteFile(fileName),
      );
      await Promise.all(deletePromises);
      return true;
    } catch (error) {
      throw new BadRequestException(`Error deleting files: ${error.message}`);
    }
  }

  async deleteFile(fileName: string): Promise<boolean> {
    try {
      const filePath = join(this.uploadsFolder, fileName);

      if (!(await this.fileExists(filePath))) {
        throw new BadRequestException('File not found');
      }

      await fs.unlink(filePath);
      return true;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error deleting file');
    }
  }

  private async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}
