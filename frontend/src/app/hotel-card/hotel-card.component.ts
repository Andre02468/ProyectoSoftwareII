import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.css']
})
export class HotelCardComponent {
  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() price: string = '';
  @Input() rating: number = 0;
  @Input() features: string[] = [];

  getStarsArray(): number[] {
    return [1, 2, 3, 4, 5];
  }
}