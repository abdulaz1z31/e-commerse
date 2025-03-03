import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubCategoryEntity } from '../entities/subCategory.entity';
import { CreateSubCategoryDto } from '../dtos/create-sub-category.dto';
import { UpdateSubCategoryDto } from '../dtos/update-sub-category.dto';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategoryEntity)
    private readonly subCategoryRepository: Repository<SubCategoryEntity>,
  ) {}

  async create(dto: CreateSubCategoryDto) {
    const existsCategory = await this.subCategoryRepository.findOneBy({
      name: dto.name,
    });
    if (existsCategory) {
      throw new ConflictException('Category already exists');
    }
    const category = await this.subCategoryRepository.save(dto);
    return {
      statusCode: 201,
      message: 'Created',
      data: category,
    };
  }

  async findAll() {
    const categrories = await this.subCategoryRepository.find();
    return {
      statusCode: 200,
      message: 'Success',
      data: categrories,
    };
  }

  async findOne(id: string) {
    const category = await this.subCategoryRepository.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return {
      statusCode: 200,
      message: 'Success',
      data: category,
    };
  }

  async update(id: string, dto: UpdateSubCategoryDto) {
    const [exitingCategory, exitingName] = await Promise.all([
      this.subCategoryRepository.findOneBy({ id }),
      this.subCategoryRepository.findOneBy({ name: dto.name }),
    ]);
    if (exitingCategory) {
      throw new NotFoundException('Category not found');
    }
    if (exitingName) {
      throw new ConflictException('Category already exists');
    }
    await this.subCategoryRepository.update(id, dto);
    return {
      statusCode: 200,
      message: 'Updated',
      data: {},
    };
  }

  async remove(id: string) {
    const category = await this.subCategoryRepository.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    await this.subCategoryRepository.delete(id);
  }
}
