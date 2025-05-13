import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { ReportDto } from './reports.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  async generateReport(dto: ReportDto) {
    const { hotelId, start, end } = dto;
    
    const totalReservations = await this.reportRepository.count({ 
      where: { hotelId }
    });
    
    const confirmedReservations = await this.reportRepository.count({
      where: {
        hotelId,
        status: 'confirmed',
        start: new Date(start),
        end: new Date(end)
      }
    });
    
    return { hotelId, totalReservations, confirmedReservations };
  }

  async createReport(createReportDto: ReportDto) {
    const report = this.reportRepository.create(createReportDto);
    return this.reportRepository.save(report);
  }
}