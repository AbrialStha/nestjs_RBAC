import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  @MaxLength(255)
  @ApiProperty({ required: true, maxLength: 255 })
  name: string;

  @IsEmail()
  @IsDefined()
  @ApiProperty({ required: true })
  email: string;

  @IsPhoneNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  phone_number?: string;

  @IsDefined()
  @IsString()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: 'password too weak',
    },
  )
  @ApiProperty({ required: true })
  password: string;

  @IsDefined()
  @IsEnum(UserRole)
  @ApiProperty({ required: true, enum: UserRole })
  role: UserRole;
}
