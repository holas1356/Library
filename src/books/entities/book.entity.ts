import { Author } from "src/authors/entities/author.entity";
import { Sale } from "src/sales/entities/sale.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
    @Column({ primary: true, generated: true })
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    description: string;
  
    @Column('decimal', { precision: 10, scale: 2 })
    price: number;
  
    @ManyToOne(() => Author, author => author.books)
    @JoinColumn({ name: 'authorId' }) 
    author: Author;
    

    @OneToMany(() => Sale, sale => sale.book)
    sales: Sale[]; 

    @DeleteDateColumn()
    deletedAt: Date;
}
