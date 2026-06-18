import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'The max of characters is 100' })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255, { message: 'The max of characters is 255' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255, { message: 'The max of characters is 255' })
  password: string;
}
