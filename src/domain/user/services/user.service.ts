import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { HashingService } from 'src/infrastructure';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly hashService: HashingService,
  ) {}

  async isUsernameExists(username: string): Promise<boolean> {
    if (!username) return false;
    const user = await this.repository.findOneBy({ username });
    return !!user;
  }

  async findByUsername(username: string) {
    if (!username) return false;
    const user = await this.repository.findOneBy({ username });
    return user;
  }

  async create(dto: CreateUserDto) {
    if (dto.password) {
      dto.password = await this.hashService.encrypt(dto.password);
    }
    let created_data = this.repository.create(dto);
    created_data = await this.repository.save(created_data);
    return {
      message: 'Created',
      statusCode: 201,
      data: created_data,
    };
  }

  async save(dto: CreateUserDto) {
    if (dto.password) {
      dto.password = await this.hashService.encrypt(dto.password);
    }
    let created_data = this.repository.create(dto);
    created_data = await this.repository.save(created_data);
    return created_data;
  }

  async findAll() {
    const data = await this.repository.find();
    return {
      message: 'Success',
      statusCode: 200,
      data: data,
    };
  }

  async findOneBy(options: Partial<UserEntity>) {
    const data = await this.repository.findOne({ where: { ...options } });
    if (!data) {
      throw new HttpException('Not found', 404);
    }
    return {
      message: 'Success',
      statusCode: 200,
      data: data,
    };
  }

  async update(id: string, dto: Partial<CreateUserDto>) {
    if (dto?.password) {
      dto.password = await this.hashService.encrypt(dto.password);
    }
    await this.repository.update(id, { ...dto, updated_at: new Date() });
    const newData = await this.repository.findOneBy({ id });
    return {
      message: 'Updated',
      statusCode: 200,
      data: newData,
    };
  }

  async delete(id: string) {
    await this.repository.delete(id);
    return {
      message: 'Deleted',
      statusCode: 200,
      data: { id },
    };
  }
}
