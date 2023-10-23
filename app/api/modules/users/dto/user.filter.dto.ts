import { IsNotEmpty } from 'class-validator';

export class UserFilterDto {
  @IsNotEmpty()
  id: number;
}
