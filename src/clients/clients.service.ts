import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {

  constructor(
    @InjectRepository(Client) private readonly clientRepository: Repository<Client>) {}
  async create(createClientDto: CreateClientDto) {
    const existingClient = await this.clientRepository.findOneBy({ email: createClientDto.email });
    if (existingClient) {
      throw new BadRequestException('Email is already in use.');
    }

    const client = this.clientRepository.create(createClientDto);
    return await this.clientRepository.save(client);
  }

async findAll() {
    return await this.clientRepository.find();
  }

  async findOne(id: number) {
    const client = await this.clientRepository.findOneBy({ id });
    if (!client) {
      throw new NotFoundException('client not found');
    }
    return client;;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const existingclient = await this.clientRepository.findOneBy({ id });
    if (!existingclient) {
      throw new NotFoundException('Client not found');
    }
    await this.clientRepository.update(id, updateClientDto);
    const updatedClient = await this.clientRepository.findOneBy({ id });
    if (!updatedClient) {
      throw new NotFoundException('Could not find updated client');
    }

    return updatedClient;
  }

  async remove(id: number) {
    const clientToRemove = await this.clientRepository.findOneBy({ id });
    if (!clientToRemove) {
      throw new NotFoundException('Client not found');
    }
    await this.clientRepository.softDelete({ id });
    return clientToRemove;;
  }
}
