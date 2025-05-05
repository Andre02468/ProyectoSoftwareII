import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { Hotel, HotelSchema } from './schemas/hotels.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/jwt.strategy';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
    JwtModule.register({
      secret: 'secretKey', // Usa una clave secreta más segura
      signOptions: { expiresIn: '60s' }, // Tiempo de expiración del token
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [HotelsService, JwtStrategy], // Añadir la estrategia JWT al array de providers
  controllers: [HotelsController],
  exports: [HotelsService, MongooseModule],
})
export class HotelsModule {}
