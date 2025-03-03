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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  MultipleImagesValidationPipe,
  Roles,
  SingleImageValidationPipe,
} from 'src/common';
import {
  CreateSubCategoryDto,
  ImageService,
  OwnerType,
  SubCategoryService,
  UpdateSubCategoryDto,
  UserRoles,
} from 'src/domain';

@ApiTags('SubCategory')
@ApiBearerAuth()
@Controller('sub-category')
export class SubCategoryController {
  constructor(
    private readonly categoryService: SubCategoryService,
    private readonly imageService: ImageService,
  ) {}

  @Post(':id/upload-image')
  @Roles(UserRoles.admin)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload an image for subcategory' })
  @ApiResponse({ status: 201, description: 'Image uploaded successfully' })
  async uploadOne(
    @UploadedFile(new SingleImageValidationPipe()) file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return await this.imageService.uploadOne(file, id, OwnerType.category);
  }

  @Post(':id/upload-images')
  @Roles(UserRoles.admin)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiOperation({ summary: 'Upload multiple images for subcategory' })
  @ApiResponse({ status: 201, description: 'Images uploaded successfully' })
  async uploadMany(
    @UploadedFiles(new MultipleImagesValidationPipe())
    files: Express.Multer.File[],
    @Param('id') id: string,
  ) {
    return await this.imageService.uploadMany(files, id, OwnerType.category);
  }

  @Delete('image/:imageId')
  @Roles(UserRoles.admin)
  @ApiOperation({ summary: 'Remove a single image' })
  @ApiResponse({ status: 200, description: 'Image removed successfully' })
  async removeOne(@Param('imageId') imageId: string) {
    return await this.imageService.removeOne(imageId);
  }

  @Delete('images')
  @Roles(UserRoles.admin)
  @ApiOperation({ summary: 'Remove multiple images' })
  @ApiResponse({ status: 200, description: 'Images removed successfully' })
  async removeMany(@Body('imageIds') imageIds: string[]) {
    return await this.imageService.removeMany(imageIds);
  }

  @Post()
  @Roles(UserRoles.admin)
  @ApiOperation({ summary: 'Create a new subcategory' })
  @ApiResponse({ status: 201, description: 'Subcategory created successfully' })
  create(@Body() createDto: CreateSubCategoryDto) {
    return this.categoryService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all subcategories' })
  @ApiResponse({
    status: 200,
    description: 'List of subcategories returned successfully',
  })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get subcategory by ID' })
  @ApiResponse({
    status: 200,
    description: 'Subcategory details returned successfully',
  })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRoles.admin)
  @ApiOperation({ summary: 'Update subcategory' })
  @ApiResponse({ status: 200, description: 'Subcategory updated successfully' })
  update(@Param('id') id: string, @Body() updateDto: UpdateSubCategoryDto) {
    return this.categoryService.update(id, updateDto);
  }

  @Delete(':id')
  @Roles(UserRoles.admin)
  @ApiOperation({ summary: 'Delete subcategory' })
  @ApiResponse({ status: 200, description: 'Subcategory deleted successfully' })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
