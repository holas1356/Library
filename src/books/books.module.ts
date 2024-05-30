import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/authors/entities/author.entity';
import { Sale } from 'src/sales/entities/sale.entity';
import { Book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Book, Author, Sale])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
