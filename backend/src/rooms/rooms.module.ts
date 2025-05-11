import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { HotelsModule } from '../hotels/hotels.module';

@Module({
  imports: [HotelsModule],
  providers: [RoomsService],
  controllers: [RoomsController],
  
})
export class RoomsModule {}

