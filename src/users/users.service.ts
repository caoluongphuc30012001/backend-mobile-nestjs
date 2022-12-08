import { UserDocument, User } from './schemas/users.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { info } from 'console';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(userPayload: User): Promise<string> {
    try {
      const user = await this.userModel.findOne({
        phoneNumber: userPayload.phoneNumber,
      });

      if (user) {
        return 'This phonenumber was registered';
      }

      userPayload.password = await bcrypt.hash(userPayload.password, 10);
      await this.userModel.create(userPayload);
      return 'Create user successfully';
    } catch (error) {
      return 'Something failed';
    }
  }

  async getUserInformation(
    userId: string,
  ): Promise<User | undefined | null | string> {
    try {
      const user = await this.userModel
        .findById(userId)
        .select('-password -role');
      return user;
    } catch (error) {
      return 'Something failed';
    }
  }

  async getAllUsers(): Promise<User[] | string> {
    try {
      return await this.userModel.find({});
    } catch (error) {
      return 'Something failed';
    }
  }

  async findUser(
    phoneNumber: string,
  ): Promise<User | undefined | null | string> {
    try {
      return await this.userModel
        .findOne({ phoneNumber: phoneNumber })
        .select('-password -role');
    } catch (error) {}
    return 'Something failed';
  }

  async modifyUserInformation(
    userPayload: User,
    userId: string,
  ): Promise<string> {
    try {
      await this.userModel.findByIdAndUpdate(userId, userPayload);
      return 'Modify user information successfully';
    } catch (error) {
      return 'Something failed';
    }
  }

  async validate(phoneNumber: string, password: string): Promise<any> {
    try {
      const user = await this.userModel.findOne({
        phoneNumber: phoneNumber,
      });
      if (user) {
        const check = await bcrypt.compare(password, user.password);
        if (check) return user;
        else return null;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}
