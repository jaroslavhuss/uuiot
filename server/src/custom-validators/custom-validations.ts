import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class AdminUserRoles implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return text === 'iotuser' || text === 'iotadmin';
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Text ($value) is too short or too long!';
  }
}
