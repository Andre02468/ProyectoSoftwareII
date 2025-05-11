import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './schemas/reviews.schema';
import { ReviewDto } from './reviews.dto';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review.name) private model: Model<Review>) {}

  create(dto: ReviewDto) {
    return this.model.create(dto);
  }

  findAllByHotel(hotelId: string) {
    return this.model.find({ hotelId }).exec();
  }

  findOne(id: string) {
    return this.model.findById(id).exec();
  }

  update(id: string, dto: Partial<ReviewDto>) {
    return this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }
}
