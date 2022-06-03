import {
  IsEmail,
  IsString,
  MaxLength,
  IsOptional,
  IsBoolean,
  Validate,
} from 'class-validator';
import { AdminUserRoles } from "../../custom-validators"

export class UserUpdateDto {
  @IsEmail()
  @MaxLength(255)
  @IsOptional()
  email: string;

  @IsOptional()
  @IsString({ message: 'Name must be a text!' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Surname must be a text!' })
  surname: string;

  //Default DTO options
  @IsOptional()
  @IsString({
    message: 'Auth level must be a string',
  })
  @Validate(AdminUserRoles, {
    message: 'Only iotadmin or iotuser is acceptable',
  })
  authLevel: string;

  @IsOptional()
  @IsBoolean()
  isUserApproved: boolean;
}

export class UserDeleteDto {
  @IsString()
  id: string;
}
