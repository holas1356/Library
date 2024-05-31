import { Book } from "src/books/entities/book.entity";
import { Column, DeleteDateColumn, Entity,  ManyToOne,  OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Author {
    @Column({ primary: true, generated: true })
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    email: string;
  
   @OneToMany(() => Book, books=> books.author)
    books: Book[];

    @DeleteDateColumn()
    deletedAt: Date;
   
}
