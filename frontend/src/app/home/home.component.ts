import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelCardComponent } from '../hotel-card/hotel-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HotelCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  hotels = [
    {
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef', // Bosque otoñal
      title: 'CABINAS DEL BOSQUE DORADO',
      price: '$170/noche',
      rating: 4.8,
      features: ['Chimenea interior', 'Senderos privados', 'Terrazas con vistas', 'WiFi gratis', 'Desayuno artesanal']
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f', // Montañas otoñales
      title: 'REFUGIO MONTAÑA ROJA',
      price: '$195/noche',
      rating: 4.9,
      features: ['Sauna natural', 'Restaurante de temporada', 'Observatorio estelar', 'Baños termales']
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b', // Camino de hojas
      title: 'LODGE HOJAS CARMESÍ',
      price: '$220/noche',
      rating: 4.7,
      features: ['Cabañas premium', 'Recolección de manzanas', 'Spa con especias otoñales', 'Tours guiados']
    }
  ];

  // Texto del banner principal
  bannerTitle = 'Descubre los mejores hoteles';
  bannerSubtitle = 'Experiencias únicas en lugares paradisíacos';
}