import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsString, Matches, MinLength } from 'class-validator';

export class ChangePasswordDTO {
  @ApiProperty()
  @IsEmpty()
  @IsString()
  oldPassword: string;
  @ApiProperty()
  @IsEmpty()
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  newPassword: string;
}
