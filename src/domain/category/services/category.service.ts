import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(dto: CreateCategoryDto) {
    const existsCategory = await this.categoryRepository.findOneBy({
      name: dto.name,
    });
    if (existsCategory) {
      throw new ConflictException('Category already exists');
    }
    const category = await this.categoryRepository.save(dto);
    return {
      statusCode: 201,
      message: 'Created',
      data: category,
    };
  }

  async findAll() {
    const categrories = await this.categoryRepository.find();
    return {
      statusCode: 200,
      message: 'Success',
      data: categrories,
    };
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return {
      statusCode: 200,
      message: 'Success',
      data: category,
    };
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const [exitingCategory, exitingName] = await Promise.all([
      this.categoryRepository.findOneBy({ id }),
      this.categoryRepository.findOneBy({ name: dto.name }),
    ]);
    if (exitingCategory) {
      throw new NotFoundException('Category not found');
    }
    if (exitingName) {
      throw new ConflictException('Category already exists');
    }
    await this.categoryRepository.update(id, dto);
    return {
      statusCode: 200,
      message: 'Updated',
      data: {},
    };
  }

  async remove(id: string) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    await this.categoryRepository.delete(id);
  }
}
