export declare class AuthDto {
    email: string;
    password: string;
}
export declare class SignUpDto {
    email: string;
    password: string;
    confirmedPassword: string;
    name: string;
    surname: string;
    authLevel: 'iotuser';
    isUserApproved: Boolean;
}
export declare class UserIdDto {
    id: string;
}
