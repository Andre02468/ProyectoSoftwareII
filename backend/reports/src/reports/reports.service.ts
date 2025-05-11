import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reports, ReportsDocument } from './schemas/reports.schema';
import { ReportDto } from './reports.dto';


@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Reports.name) private reservationModel: Model<ReportsDocument>,
  ) {}

  // Método para generar reporte (ya existente)
  async generateReport(dto: ReportDto) {
    const { hotelId, start, end } = dto;
    const totalReservations = await this.reservationModel.countDocuments({ hotelId });
    const confirmedReservations = await this.reservationModel.countDocuments({
      hotelId,
      status: 'confirmed',
      checkIn: { $lte: new Date(end) },
      checkOut: { $gte: new Date(start) },
    });
    return { hotelId, totalReservations, confirmedReservations };
  }

  // Método para crear un reporte
  async createReport(createReportDto: ReportDto) {
    const createdReport = new this.reservationModel(createReportDto);
    return createdReport.save();
  }
}

