import { Transform } from "class-transformer";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateClientDto {
    @IsString()
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres.' })
    @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres.' })
    name: string;
  
    @IsEmail({}, { message: 'El correo electrónico no es válido.' })
    @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
    email: string;
}
