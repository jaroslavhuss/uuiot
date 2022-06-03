import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    updateUser(id: string, attrs: Partial<User>): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    deleteUser(id: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getAllUsers(): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
}
