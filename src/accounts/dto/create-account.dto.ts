import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUUID, Length } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  balance: string;

  @IsString()
  @Length(18)
  @ApiProperty()
  numberAccount?: string;

  @IsString()
  @Length(16)
  @ApiProperty()
  numberTarget?: string;

  @IsUUID()
  @ApiProperty()
  userId: string;

  @IsInt()
  @ApiProperty()
  accountTypeId: number;
}
