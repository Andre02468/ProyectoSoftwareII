import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema'; // Asegúrate de tener UserDocument
import { UserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userDto: UserDto): Promise<User> {
    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async update(id: string, userDto: UserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, userDto, { new: true }).exec();
    if (!updatedUser) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    await this.userModel.findByIdAndDelete(id).exec();
  }
}
