import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  CreateSubCategoryDto,
  SubCategoryService,
  UpdateSubCategoryDto,
} from 'src/domain';

@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly categoryService: SubCategoryService) {}

  @Post()
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
  update(@Param('id') id: string, @Body() updateDto: UpdateSubCategoryDto) {
    return this.categoryService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
