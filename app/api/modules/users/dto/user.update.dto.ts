import { IsNotEmpty } from 'class-validator';
export class UserUpdateDto {
  id: string;

  @IsNotEmpty()
  name: string;
}
