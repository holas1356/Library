import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { Client } from './entities/client.entity';
import { Sale } from 'src/sales/entities/sale.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Sale])],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
