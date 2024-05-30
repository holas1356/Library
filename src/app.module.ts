import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { SalesModule } from './sales/sales.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './authors/entities/author.entity';
import { Book } from './books/entities/book.entity';
import { Sale } from './sales/entities/sale.entity';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.DB_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    autoLoadEntities: true,
    synchronize: true,
    entities: [Author, Book, Sale],
    extra: {
      ssl: true,
    }
  }),
  TypeOrmModule.forFeature([Author, Book, Sale]),
  BooksModule, 
  AuthorsModule, 
  SalesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
