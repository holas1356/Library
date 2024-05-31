import { IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class CreateSaleDto {
    @IsInt()
    @IsNotEmpty()
    bookId: number;

    @IsInt()
    @IsNotEmpty()
    clientId: number;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    quantity: number;

}
