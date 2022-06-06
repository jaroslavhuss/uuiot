import { UserService } from './user.service';
import { User } from '../schemas/user.schema';
import { UserUpdateDto } from './dto';
export declare class UserController {
    private user;
    constructor(user: UserService);
    whoAmI(user: User): User;
    whoAmIAdmin(user: User): User;
    updateUser(body: UserUpdateDto, id: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    deleteUser(id: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getAllUsers(): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
}
