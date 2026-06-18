import { IsEmail, IsNotEmpty, MaxLength, IsString } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255, { message: 'The max of characters is 255' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255, { message: 'The max of characters is 255' })
  password: string;
}