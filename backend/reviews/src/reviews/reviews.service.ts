import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { ReviewDto } from './reviews.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  create(dto: ReviewDto) {
    const review = this.reviewRepository.create(dto);
    return this.reviewRepository.save(review);
  }

  findAllByHotel(hotelId: number) {
    return this.reviewRepository.find({ 
      where: { hotelId },
      order: { createdAt: 'DESC' }
    });
  }

  findOne(id: number) {
    return this.reviewRepository.findOne({ where: { id } });
  }

  update(id: number, dto: Partial<ReviewDto>) {
    return this.reviewRepository.update(id, dto);
  }

  remove(id: number) {
    return this.reviewRepository.delete(id);
  }
}