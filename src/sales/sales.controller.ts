import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Sale } from './entities/sale.entity';

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a sale' })
  @ApiResponse({ status: 201, description: 'The sale was created successfully', type: Sale })
  @ApiResponse({ status: 400, description: 'Invalid parameters' })
  @UsePipes(new ValidationPipe())
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sales' })
  @ApiResponse({ status: 200, description: 'All sales were obtained', type: [Sale] })
  findAll() {
    return this.salesService.findAll();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get a sale by ID' })
  @ApiParam({ name: 'id', description: 'Sale ID' })
  @ApiResponse({ status: 200, description: 'Sale was found', type: Sale })
  @ApiResponse({ status: 404, description: 'The sale was not found' })
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a sale by ID' })
  @ApiParam({ name: 'id', description: 'Sale ID' })
  @ApiResponse({ status: 200, description: 'The sale was updated successfully', type: Sale })
  @ApiResponse({ status: 400, description: 'Invalid parameters' })
  @ApiResponse({ status: 404, description: 'The sale was not found' })
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(+id, updateSaleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a sale by ID' })
  @ApiParam({ name: 'id', description: 'Sale ID' })
  @ApiResponse({ status: 200, description: 'The sale was successfully deleted' })
  @ApiResponse({ status: 404, description: 'The sale was not found' })
  remove(@Param('id') id: string) {
    return this.salesService.remove(+id);
  }
}
