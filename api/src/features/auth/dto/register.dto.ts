import { IsString, IsNotEmpty, MinLength, MaxLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  username!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(100)
  password!: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;
}
