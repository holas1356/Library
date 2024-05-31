import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Book } from 'src/books/entities/book.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale) private readonly saleRepository: Repository<Sale>,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Client) private readonly clientRepository: Repository<Client>,
  ) { }
  async create(createSaleDto: CreateSaleDto) {
    const { bookId, clientId, quantity } = createSaleDto;

    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    const client = await this.clientRepository.findOne({ where: { id: clientId } });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    const totalPrice = book.price * quantity; 

    const sale = new Sale();
    sale.book = book;
    sale.client = client;
    sale.quantity = quantity;
    sale.totalPrice = totalPrice;
  

    return await this.saleRepository.save(sale);
  }

  async findAll() {
    return await this.saleRepository
      .createQueryBuilder('sale')
      .leftJoinAndSelect('sale.book', 'book')
      .leftJoinAndSelect('sale.client', 'client')
      .getMany();;
  }

  async findOne(id: number) {
    const sale = await this.saleRepository
    .createQueryBuilder('sale')
    .leftJoinAndSelect('sale.book', 'book')
    .leftJoinAndSelect('sale.client', 'client')
    .where('sale.id = :id', { id })
    .getOne();

    if (!sale) {
      throw new NotFoundException('sale not found');
    }

    return sale;
  }
  



  async update(id: number, updateSaleDto: UpdateSaleDto) {
    const { bookId, clientId, quantity } = updateSaleDto;
    const sale = await this.saleRepository.findOneBy({id});
    if (!sale) {
      throw new NotFoundException('Sale not found');
    }
    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    const client = await this.clientRepository.findOne({ where: { id: clientId } });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    sale.book = book;
    sale.client = client;
    sale.quantity = quantity;

    return await this.saleRepository.save(sale);
  }

  async remove(id: number) {
    const saleRemove = await this.saleRepository
        .createQueryBuilder('sale')
        .leftJoinAndSelect('sale.book', 'book')
        .leftJoinAndSelect('sale.client', 'client')
        .where('sale.id = :id', { id })
        .getOne();
    if(!saleRemove){
      throw new NotFoundException('Sale not found');
    }
    await this.saleRepository.softDelete({id})
    return saleRemove
  }
}


