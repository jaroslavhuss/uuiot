import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class AdminUserRoles implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
