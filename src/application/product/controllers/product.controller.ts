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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import {
  MultipleImagesValidationPipe,
  Roles,
  SingleImageValidationPipe,
} from 'src/common';
import {
  CreateProductDto,
  ImageService,
  OwnerType,
  ProductService,
  UpdateProductDto,
  UserRoles,
} from 'src/domain';

@ApiTags('Product')
@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly imageService: ImageService,
  ) {}

  @Post(':id/upload-image')
  @Roles(UserRoles.admin)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a single image for a product' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiParam({ name: 'id', type: 'string', description: 'Product ID' })
  async uploadOne(
    @UploadedFile(new SingleImageValidationPipe()) file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return await this.imageService.uploadOne(file, id, OwnerType.category);
  }

  @Post(':id/upload-images')
  @Roles(UserRoles.admin)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiOperation({ summary: 'Upload multiple images for a product' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: { type: 'array', items: { type: 'string', format: 'binary' } },
      },
    },
  })
  @ApiParam({ name: 'id', type: 'string', description: 'Product ID' })
  async uploadMany(
    @UploadedFiles(new MultipleImagesValidationPipe())
    files: Express.Multer.File[],
    @Param('id') id: string,
  ) {
    return await this.imageService.uploadMany(files, id, OwnerType.category);
  }

  @Delete('image/:imageId')
  @Roles(UserRoles.admin)
  @ApiOperation({ summary: 'Delete a single image' })
  @ApiParam({ name: 'imageId', type: 'string', description: 'Image ID' })
  async removeOne(@Param('imageId') imageId: string) {
    return await this.imageService.removeOne(imageId);
  }

  @Delete('images')
  @Roles(UserRoles.admin)
  @ApiOperation({ summary: 'Delete multiple images' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        imageIds: {
          type: 'array',
          items: { type: 'string' },
        },
      },
    },
  })
  async removeMany(@Body('imageIds') imageIds: string[]) {
    return await this.imageService.removeMany(imageIds);
  }

  @Post()
  @Roles(UserRoles.admin)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiBody({ type: CreateProductDto })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'List of products' })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single product' })
  @ApiParam({ name: 'id', type: 'string', description: 'Product ID' })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRoles.admin)
  @ApiOperation({ summary: 'Update a product' })
  @ApiParam({ name: 'id', type: 'string', description: 'Product ID' })
  @ApiBody({ type: UpdateProductDto })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(UserRoles.admin)
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id', type: 'string', description: 'Product ID' })
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
