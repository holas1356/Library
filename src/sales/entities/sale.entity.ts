import { Book } from "src/books/entities/book.entity";
import { Client } from "src/clients/entities/client.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sale {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    quantity: number;
  
    @Column()
    totalPrice: number;
  
    @Column()
    date: Date;
  
    @ManyToOne(() => Book, book => book.sales)
    book: Book; 

    @ManyToOne(() => Client, client => client.sales)
    client: Client;
}
