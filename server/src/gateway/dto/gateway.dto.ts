import {
  IsString,
  IsNumber,
  MinLength,
  IsNotEmpty,
  MaxLength,
  Matches,
  IsOptional,
  IsMongoId,
  IsBoolean,
} from 'class-validator';

export class GatewaySaveDto {
  @IsString()
  gatewayName: string;
  @IsNumber()
  temp: number;
  @IsNumber()
  hum: number;
}

export class GatewaySaveHumidityDto {
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsNumber()
  @IsNotEmpty()
  humidity: number;

  @IsBoolean()
  @IsNotEmpty()
  wasSent: boolean;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsOptional()
  gw: string;
}

export class createGateWayDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must have at least 3 letters!' })
  name: string;

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
  description: string;

  @IsOptional()
  creator: string;
}

export class GatewayLogInDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must have at least 3 letters!' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Minimum length is 6 with special characters' })
  @MaxLength(20, { message: 'Maximum length is 20' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password is too weak - it has to contain at least one Capital Letter and one number.',
  })
  password: string;
}

export class GatewayID {
  @IsMongoId()
  id: string;
}
