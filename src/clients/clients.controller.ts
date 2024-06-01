import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Client } from './entities/client.entity';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a client' })
  @ApiResponse({ status: 201, description: 'The client was created successfully', type: Client })
  @ApiResponse({ status: 400, description: 'Invalid parameters' })
  @UsePipes(new ValidationPipe())
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({ status: 200, description: 'All clients were obtained', type: [Client] })
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer by ID' })
  @ApiParam({ name: 'id', description: 'client ID' })
  @ApiResponse({ status: 200, description: 'The client was found', type: Client })
  @ApiResponse({ status: 404, description: 'The client was not found' })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a client by ID' })
  @ApiParam({ name: 'id', description: 'client ID' })
  @ApiResponse({ status: 200, description: 'The client was successfully updated', type: Client })
  @ApiResponse({ status: 400, description: 'Invalid parameters' })
  @ApiResponse({ status: 404, description: 'The client was not found' })
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a customer by ID' })
  @ApiParam({ name: 'id', description: 'client ID' })
  @ApiResponse({ status: 200, description: 'The client was successfully deleted' })
  @ApiResponse({ status: 404, description: 'The client was not found' })
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
