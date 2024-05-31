import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from 'src/authors/entities/author.entity';


@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author) private readonly authorRepository: Repository<Author>,
  ) { }
  async create(createBookDto: CreateBookDto) {
    const existingBook = await this.bookRepository.findOneBy({ title: createBookDto.title });
    if (existingBook) {
      throw new BadRequestException('the book already exists');
    }
    const author = await this.authorRepository.findOneBy({ id: createBookDto.authorId });
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    const book = this.bookRepository.create({
      ...createBookDto,
      author,
    });
    return await this.bookRepository.save(book);

  }

  async findAll() {
    return await this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author') 
      .getMany();
  }

  async findOne(id: number) {
    const book = await this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author')
      .where('book.id = :id', { id })
      .getOne();

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const { authorId, title, description, price } = updateBookDto;
    const existingBook = await this.bookRepository.findOneBy({id});
    if (!existingBook) {
      throw new NotFoundException('Book not found');
    }
    const author = await this.authorRepository.findOne({where: {id: authorId}});
    if(!author){
      throw new NotFoundException('Author not found');
    }
    existingBook.author = author;
    existingBook.title = title;
    existingBook.description = description;
    existingBook.price = price;

    return await this.bookRepository.save(existingBook);
   
  }

  async remove(id: number) {
    const bookToRemove = await this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author')
      .where('book.id = :id', { id })
      .getOne();
    if (!bookToRemove) {
      throw new NotFoundException('Book not found');
    }
    await this.bookRepository.softDelete({ id });
    return bookToRemove;
  }
}
