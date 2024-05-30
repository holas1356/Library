import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { Author } from './entities/author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/books/entities/book.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Author, Book])],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
