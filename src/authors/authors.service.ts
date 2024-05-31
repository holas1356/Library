import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorsService {

  constructor(
    @InjectRepository(Author) private readonly authorRepository: Repository<Author>
  ) { }
  async create(createAuthorDto: CreateAuthorDto) {
    const existingAuthor = await this.authorRepository.findOneBy({ email: createAuthorDto.email });
    if (existingAuthor) {
      throw new BadRequestException('Email is already in use.');
    }

    const author = this.authorRepository.create(createAuthorDto);
    return await this.authorRepository.save(author);
  }

  async findAll() {
      return await this.authorRepository.find();
  }

  async findOne(id: number) {
    const author = await this.authorRepository.findOneBy({ id });
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const existingAuthor = await this.authorRepository.findOneBy({ id });
    if (!existingAuthor) {
      throw new NotFoundException('Author not found');
    }
    await this.authorRepository.update(id, updateAuthorDto);
    const updatedAuthor = await this.authorRepository.findOneBy({ id });
    if (!updatedAuthor) {
      throw new NotFoundException('Could not find updated author');
    }

    return updatedAuthor;
  }

  async remove(id: number) {
    const authorToRemove = await this.authorRepository.findOneBy({ id });
    if (!authorToRemove) {
      throw new NotFoundException('Author not found');
    }
    await this.authorRepository.softDelete({ id });
    return authorToRemove;
  }
}
