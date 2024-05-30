import { Author } from "src/authors/entities/author.entity";
import { Sale } from "src/sales/entities/sale.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    description: string;
  
    @Column()
    price: number;
  
    @ManyToOne(() => Author, author => author.books)
    author: Author;
    

    @OneToMany(() => Sale, sale => sale.book)
    sales: Sale[]; 
}
