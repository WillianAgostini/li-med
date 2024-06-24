import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'João da Silva' })
  @IsString()
  name: string;

  @ApiProperty({ example: '15/05/1985' })
  @IsString()
  dateOfBirth: string;

  @ApiProperty({ example: 'Masculino' })
  @IsString()
  gender: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  recordNumber: string;
}
