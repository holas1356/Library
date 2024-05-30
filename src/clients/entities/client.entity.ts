import { Sale } from "src/sales/entities/sale.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {
@PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Sale, sale => sale.client)
  sales: Sale[];
}
