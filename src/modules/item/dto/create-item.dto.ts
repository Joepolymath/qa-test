import { IsOptional, IsString } from 'class-validator';
import { User } from 'src/modules/user/entities/user.entity';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  user: User;
}
export class UpdateItemDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  user: User;
}
