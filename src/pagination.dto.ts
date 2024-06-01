// pagination.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ default: 1, required: false })
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number = 1;

  @ApiProperty({ default: 10, required: false })
  @IsInt()
  @Min(1)
  @IsOptional()
  pageSize: number = 10;
}
