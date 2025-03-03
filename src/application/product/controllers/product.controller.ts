import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe, Roles } from 'src/common';
import {
  CreateProductDto,
  ImageService,
  OwnerType,
  ProductService,
  UpdateProductDto,
  UserRoles,
} from 'src/domain';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly imageService: ImageService,
  ) {}

  @Post(':id/upload-image')
  @Roles(UserRoles.admin)
  @UseInterceptors(FileInterceptor('file'))
  async uploadOne(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return await this.imageService.uploadOne(file, id, OwnerType.category);
  }

  @Post(':id/upload-images')
  @Roles(UserRoles.admin)
  @UseInterceptors(FilesInterceptor('files'))
  async uploadMany(
    @UploadedFiles(new ImageValidationPipe()) files: Express.Multer.File[],
    @Param('id') id: string,
  ) {
    return await this.imageService.uploadMany(files, id, OwnerType.category);
  }

  @Delete('image/:imageId')
  @Roles(UserRoles.admin)
  async removeOne(@Param('imageId') imageId: string) {
    return await this.imageService.removeOne(imageId);
  }

  @Delete('images')
  @Roles(UserRoles.admin)
  async removeMany(@Body('imageIds') imageIds: string[]) {
    return await this.imageService.removeMany(imageIds);
  }
  @Post()
  @Roles(UserRoles.admin)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRoles.admin)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(UserRoles.admin)
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
