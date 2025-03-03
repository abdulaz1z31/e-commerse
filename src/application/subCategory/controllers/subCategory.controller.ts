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
  CreateSubCategoryDto,
  ImageService,
  OwnerType,
  SubCategoryService,
  UpdateSubCategoryDto,
  UserRoles,
} from 'src/domain';

@Controller('sub-category')
export class SubCategoryController {
  constructor(
    private readonly categoryService: SubCategoryService,
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
  create(@Body() createDto: CreateSubCategoryDto) {
    return this.categoryService.create(createDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRoles.admin)
  update(@Param('id') id: string, @Body() updateDto: UpdateSubCategoryDto) {
    return this.categoryService.update(id, updateDto);
  }

  @Delete(':id')
  @Roles(UserRoles.admin)
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
