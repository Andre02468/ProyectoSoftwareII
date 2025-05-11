import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Reports, ReportsSchema } from './schemas/reports.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reports.name, schema: ReportsSchema }]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
