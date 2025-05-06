import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const userExists = await this.usersService.findByUsername(registerDto.username);
    if (userExists) {
      throw new ConflictException('El usuario ya existe');
    }
    const newUser = await this.usersService.create(registerDto);
    // Usamos toObject() para convertir el documento de Mongoose a un objeto plano
    const userObj = newUser.toObject(); // Convierte el documento a un objeto plano

    return {
      message: 'Usuario registrado exitosamente',
      user: {
        _id: userObj._id, // Ahora puedes acceder al _id de manera correcta
        username: userObj.username,
        email: userObj.email,
        roles: userObj.roles,
      },
    };
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password === password) {
      const { password, ...result } = user.toObject();  // Convierte el documento a un objeto plano
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const payload = { username: user.username, sub: user._id, roles: user.roles };  // Accede a _id
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
