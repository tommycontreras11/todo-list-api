import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateOrUpdateTodoDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255, { message: 'The max of characters is 255' })
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
