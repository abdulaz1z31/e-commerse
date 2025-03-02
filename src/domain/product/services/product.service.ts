import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepository.save(createProductDto);
    return {
      statusCode: 201,
      message: 'Created',
      data: product,
    };
  }

  async findAll() {
    const products = await this.productRepository.find();
    return {
      statusCode: 200,
      message: 'Success',
      data: products,
    };
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return {
      statusCode: 200,
      message: 'Success',
      data: product,
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const exitingProduct = await this.productRepository.findOne({
      where: { id },
    });
    if (!exitingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    const product = await this.productRepository.update(id, updateProductDto);
    return {
      statusCode: 200,
      message: 'Updated',
      data: {},
    };
  }

  async remove(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await this.productRepository.delete(id);
    return {
      statusCode: 200,
      message: 'Deleted',
      data: { id },
    };
  }
}
