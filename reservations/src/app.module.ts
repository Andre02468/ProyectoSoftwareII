import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationsModule } from './reservations/reservations.module'; 
import { MongooseModule } from '@nestjs/mongoose'; 
import { ConfigModule, ConfigService } from '@nestjs/config';  

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    
    MongooseModule.forRootAsync({
      imports: [ConfigModule], 
      inject: [ConfigService],  
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        return { uri }; 
      },
    }),

    ReservationsModule,  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

