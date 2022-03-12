import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async updateUser(id: string, attrs: Partial<User>) {
    const user = await this.userModel.findOneAndUpdate(
      { _id: id },
      { ...attrs },
      { new: true },
    );
    return user;
  }

  async deleteUser(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    return user;
  }

  async getAllUsers() {
    const users = await this.userModel.find({});
    return users;
  }
}
