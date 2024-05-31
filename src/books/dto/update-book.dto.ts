
import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';


export class UpdateBookDto {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsNumber()
    @IsPositive()
    price: number;
  
    @IsInt()
    authorId: number;

}