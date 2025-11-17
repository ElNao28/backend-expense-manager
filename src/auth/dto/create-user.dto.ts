import {
  IsEmail,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  firtsname: string;

  @IsString()
  @MinLength(3)
  lastname: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  secondLastname: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsInt()
  @MinLength(10)
  @IsPositive()
  phone: string;

  @IsString()
  @MinLength(8)
  password: string;
}
