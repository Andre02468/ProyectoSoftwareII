import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportDto } from './reports.dto';


@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  async getReport(@Query() dto: ReportDto) {
    return this.reportsService.generateReport(dto);
  }
  @Post()
  async createReport(@Body() createReportDto: ReportDto) {
    return this.reportsService.createReport(createReportDto);
  }
}
