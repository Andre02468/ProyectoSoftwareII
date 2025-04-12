import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/users.entity';
import { UserDto } from './users.dto';


@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  create(userDto: UserDto): User {
    const newUser: User = {
      id: this.idCounter++,
      username: userDto.username,
      password: userDto.password,
      roles: userDto.roles || ['client'],
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return user;
  }

  findByUsername(username: string): User | undefined {
    return this.users.find(u => u.username === username);
  }

  update(id: number, userDto: UserDto): User {
    const user = this.findOne(id);
    const updatedUser = { ...user, ...userDto };
    this.users = this.users.map(u => u.id === id ? updatedUser : u);
    return updatedUser;
  }

  remove(id: number): void {
    this.findOne(id); 
    this.users = this.users.filter(u => u.id !== id);
  }
}


