import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';
import { ReportDto } from './reports.dto';


@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<ReservationDocument>,
  ) {}

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
}
