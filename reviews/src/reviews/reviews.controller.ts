import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReviewDto } from './reviews.dto';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly service: ReviewsService) {}

  @Post()
  create(@Body() dto: ReviewDto) {
    return this.service.create(dto);
  }

  @Get('hotel/:hotelId')
  findAllByHotel(@Param('hotelId') hotelId: string) {
    return this.service.findAllByHotel(hotelId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<ReviewDto>) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
