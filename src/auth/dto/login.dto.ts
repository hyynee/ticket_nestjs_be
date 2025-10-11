import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty } from 'class-validator';
import { IsEmail } from 'class-validator';

export class LoginDTO {
  @ApiProperty()
  @IsEmail()
  @IsEmpty()
  email: string;

  @ApiProperty()
  @IsEmpty()
  password: string;
}
