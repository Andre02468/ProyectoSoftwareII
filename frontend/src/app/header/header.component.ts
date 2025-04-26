import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  activeFilter: string | null = null;
  selectedDestination: string = '';
  destinationSearch: string = '';
  checkInDate: string = '';
  checkOutDate: string = '';
  guests = {
    adults: 1,
    children: 0,
    rooms: 1
  };
  
  destinations = [
    'Ciudad de México', 
    'Cancún', 
    'Guadalajara', 
    'Monterrey', 
    'Tulum', 
    'Puerto Vallarta'
  ];
  
  // Añade esto al inicio de tu clase
filteredDestinations: string[] = this.destinations;

// Modifica la función toggleFilter para manejar mejor los filtros
toggleFilter(filterName: string) {
  if (this.activeFilter === filterName) {
    this.activeFilter = null;
  } else {
    this.activeFilter = filterName;
    // Si es el filtro de destino, mostramos todas las opciones inicialmente
    if (filterName === 'destination') {
      this.filteredDestinations = this.destinations;
    }
  }
}

// Añade esta función para filtrar destinos
filterDestinations() {
  if (!this.destinationSearch) {
    this.filteredDestinations = this.destinations;
  } else {
    this.filteredDestinations = this.destinations.filter(dest =>
      dest.toLowerCase().includes(this.destinationSearch.toLowerCase())
    );
  }
}
  constructor(private elRef: ElementRef) {}

  get totalGuests() {
    return this.guests.adults + this.guests.children;
  }



  selectDestination(dest: string) {
    this.selectedDestination = dest;
    this.activeFilter = null;
  }

  adjustGuests(type: 'adults' | 'children' | 'rooms', change: number) {
    const newValue = this.guests[type] + change;
    if (newValue >= (type === 'adults' ? 1 : 0)) {
      this.guests[type] = newValue;
    }
  }

  performSearch() {
    console.log('Buscando:', {
      destination: this.selectedDestination,
      checkIn: this.checkInDate,
      checkOut: this.checkOutDate,
      guests: this.guests
    });
    this.activeFilter = null;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.activeFilter = null;
    }
  }


// Añade esta función para manejar el estado activo
isActive(filterName: string): boolean {
  return this.activeFilter === filterName;
}
}