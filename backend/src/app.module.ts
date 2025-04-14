import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelsModule } from './hotels/hotels.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [HotelsModule, AuthModule, UsersModule, RoomsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
