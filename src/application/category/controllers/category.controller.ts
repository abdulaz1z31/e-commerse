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
  CategoryService,
  CreateCategoryDto,
  ImageService,
  OwnerType,
  UpdateCategoryDto,
  UserRoles,
} from 'src/domain';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Category')
@ApiBearerAuth()
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly imageService: ImageService,
  ) {}

  @Post(':id/upload-image')
  @Roles(UserRoles.admin)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Category uchun bitta rasm upload qilish' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: 'Category id', example: '123' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'image uploaded' })
  async uploadOne(
    @UploadedFile(new ImageValidationPipe()) file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return await this.imageService.uploadOne(file, id, OwnerType.category);
  }

  @Post(':id/upload-images')
  @Roles(UserRoles.admin)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiOperation({ summary: 'Category uchun kop rasm upload qilish' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: 'Category id', example: '123' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: { type: 'array', items: { type: 'string', format: 'binary' } },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'image uploaded' })
  async uploadMany(
    @UploadedFiles(new ImageValidationPipe()) files: Express.Multer.File[],
    @Param('id') id: string,
  ) {
    return await this.imageService.uploadMany(files, id, OwnerType.category);
  }

  @Delete('image/:imageId')
  @Roles(UserRoles.admin)
  @ApiOperation({ summary: 'Bitta rasmni ochirish' })
  @ApiParam({ name: 'imageId', description: 'image id', example: 'img_456' })
  @ApiResponse({ status: 200, description: 'image deleted' })
  async removeOne(@Param('imageId') imageId: string) {
    return await this.imageService.removeOne(imageId);
  }

  @Delete('images')
  @Roles(UserRoles.admin)
  @ApiOperation({ summary: 'kop rasm ochirish' })
  @ApiBody({ schema: { type: 'array', items: { type: 'string' } } })
  @ApiResponse({ status: 200, description: 'images deleted' })
  async removeMany(@Body('imageIds') imageIds: string[]) {
    return await this.imageService.removeMany(imageIds);
  }

  @Post()
  @Roles(UserRoles.admin)
  @ApiOperation({ summary: 'Yangi Category yaratish' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ status: 201, description: 'Category created' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all ' })
  @ApiResponse({ status: 200, description: 'Cateogries' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get by id' })
  @ApiParam({ name: 'id', description: 'Category id', example: '123' })
  @ApiResponse({ status: 200, description: 'success' })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRoles.admin)
  @ApiOperation({ summary: 'Category update' })
  @ApiParam({ name: 'id', description: 'Category id', example: '123' })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({ status: 200, description: 'updated' })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @Roles(UserRoles.admin)
  @ApiOperation({ summary: 'Delete category' })
  @ApiParam({ name: 'id', description: 'Category id', example: '123' })
  @ApiResponse({ status: 200, description: 'Category deleted' })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
