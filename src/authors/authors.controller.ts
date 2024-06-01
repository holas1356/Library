import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Author } from './entities/author.entity';
import { PaginationDto } from 'src/pagination.dto';

@ApiTags('Authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create an author' })
  @ApiResponse({ status: 201, description: 'The author was successfully created', type: Author })
  @ApiResponse({ status: 400, description: 'Invalid parameters' })
  @UsePipes(new ValidationPipe())
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get('/pagination')
  @ApiOperation({ summary: 'Get all authors' })
  @ApiResponse({ status: 200, description: 'All authors were retrieved', type: [Author] })
  async findAllAuthors(@Query() paginationDto: PaginationDto) {
    return this.authorsService.findAll(paginationDto);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get an author by ID' })
  @ApiParam({ name: 'id', description: 'author ID' })
  @ApiResponse({ status: 200, description: 'The author was found', type: Author })
  @ApiResponse({ status: 404, description: 'The author was not found' })
  findOne(@Param('id') id: number) {
    return this.authorsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an author by ID' })
  @ApiParam({ name: 'id', description: 'author ID' })
  @ApiResponse({ status: 200, description: 'The author was successfully updated', type: Author })
  @ApiResponse({ status: 400, description: 'Invalid parameters' })
  @ApiResponse({ status: 404, description: 'The author was not found' })
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: number, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove an author by ID' })
  @ApiParam({ name: 'id', description: 'author ID' })
  @ApiResponse({ status: 200, description: 'The author was successfully removed' })
  @ApiResponse({ status: 404, description: 'The author was not found' })
  remove(@Param('id') id: number) {
    return this.authorsService.remove(id);
  }
}
