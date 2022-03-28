import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(6, { message: 'Minimum length is 6 with special characters' })
  @MaxLength(20, { message: 'Maximum length is 20' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password is too weak - it has to contain at least one Capital Letter and one number.',
  })
  password: string;
}

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Minimum length is 6 with special characters' })
  @MaxLength(20, { message: 'Maximum length is 20' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password is too weak - it has to contain at least one Capital Letter and one number.',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Minimum length is 6 with special characters' })
  @MaxLength(20, { message: 'Maximum length is 20' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password is too weak - it has to contain at least one Capital Letter and one number.',
  })
  confirmedPassword: string;

  @IsString({ message: 'Name must be a text!' })
  @IsNotEmpty({ message: 'Name is mandatory!' })
  name: string;

  @IsString({ message: 'Surname must be a text!' })
  @IsNotEmpty({ message: 'Surname is mandatory!' })
  surname: string;

  //Default DTO options
  authLevel: 'iotuser';
  isUserApproved: Boolean;
}

export class UserIdDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
