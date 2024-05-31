import { Book } from "src/books/entities/book.entity";
import { Client } from "src/clients/entities/client.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sale {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    quantity: number;
  
    @Column('decimal', { precision: 10, scale: 2 })
    totalPrice: number;
  
    @CreateDateColumn()
    date: Date;
  
    @ManyToOne(() => Book, book => book.sales)
    @JoinColumn({ name: 'bookId' }) 
    book: Book; 

    @ManyToOne(() => Client, client => client.sales)
    @JoinColumn({ name: 'clientId' }) 
    client: Client;

    @DeleteDateColumn()
    deletedAt: Date;
}
