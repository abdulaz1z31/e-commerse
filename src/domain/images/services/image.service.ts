import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { OwnerType } from '../constants/image.enum';
import { ImageEntity } from '../entities/image.entity';
import { FileService } from 'src/infrastructure/fileSerivce/fileService.service';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
    private readonly fileService: FileService,
  ) {}

  async uploadMany(
    files: Express.Multer.File[],
    ownerId: string,
    ownerType: OwnerType,
  ): Promise<ImageEntity[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }

    const fileNames = await this.fileService.saveFiles(files);

    const images = fileNames.map((fileName) => {
      const image = new ImageEntity();
      image.image = fileName;
      image.ownerType = ownerType;

      switch (ownerType) {
        case OwnerType.product:
          image.product_id = ownerId;
          break;
        case OwnerType.category:
          image.category_id = ownerId;
          break;
        case OwnerType.subCategory:
          image.sub_category_id = ownerId;
          break;
        default:
          throw new BadRequestException('Invalid owner type');
      }

      return image;
    });

    return this.imageRepository.save(images);
  }

  async uploadOne(
    file: Express.Multer.File,
    ownerId: string,
    ownerType: OwnerType,
  ): Promise<ImageEntity> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const fileName = await this.fileService.saveFile(file);

    const image = new ImageEntity();
    image.image = fileName;
    image.ownerType = ownerType;

    switch (ownerType) {
      case OwnerType.product:
        image.product_id = ownerId;
        break;
      case OwnerType.category:
        image.category_id = ownerId;
        break;
      case OwnerType.subCategory:
        image.sub_category_id = ownerId;
        break;
      default:
        throw new BadRequestException('Invalid owner type');
    }

    return this.imageRepository.save(image);
  }

  async removeOne(imageId: string): Promise<void> {
    const image = await this.imageRepository.findOne({
      where: { id: imageId },
    });

    if (!image) {
      throw new BadRequestException('Image not found');
    }

    await this.fileService.deleteFile(image.image);

    await this.imageRepository.delete(imageId);
  }

  async removeMany(imageIds: string[]): Promise<void> {
    if (!imageIds || imageIds.length === 0) {
      throw new BadRequestException('No image IDs provided');
    }

    const images = await this.imageRepository.find({
      where: { id: In(imageIds) },
    });

    if (images.length !== imageIds.length) {
      throw new BadRequestException('Some images not found');
    }

    const deleteFilePromises = images.map((image) =>
      this.fileService.deleteFile(image.image),
    );
    await Promise.all(deleteFilePromises);

    await this.imageRepository.delete(imageIds);
  }
}
