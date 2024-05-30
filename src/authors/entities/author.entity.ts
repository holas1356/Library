import { Book } from "src/books/entities/book.entity";
import { Column, Entity,  ManyToOne,  OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    email: string;
  
   @OneToMany(() => Book, books=> books.author)
    books: Book[];
   
}
