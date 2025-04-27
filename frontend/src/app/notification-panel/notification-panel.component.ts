import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

export interface Notification {
  id: number;
  title: string;
  message: string;
  read: boolean;
  time: string;
  icon?: string;
}

@Component({
  selector: 'app-notification-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-panel.component.html',
  styleUrl: './notification-panel.component.css'
})
export class NotificationPanelComponent {
  // Input como signal (nueva sintaxis Angular 18)
  isOpen = input.required<boolean>();
  
  // Outputs para comunicación con el componente padre
  markAsRead = output<number>();
  closePanel = output<void>();

  // Lista de notificaciones
  notifications = [
    { 
      id: 1, 
      title: 'Nueva reserva', 
      message: 'Tu reserva #12345 ha sido confirmada', 
      read: false, 
      time: 'Hace 10 min',
      icon: '📅'
    },
    { 
      id: 2, 
      title: 'Mensaje importante', 
      message: 'El check-in es a partir de las 15:00', 
      read: false, 
      time: 'Hace 1 h',
      icon: '⏰'
    }
  ];

  // Marcar una notificación como leída
  onMarkAsRead(id: number) {
    this.markAsRead.emit(id);
    this.notifications = this.notifications.map(n => 
      n.id === id ? {...n, read: true} : n
    );
  }

  // Marcar todas como leídas
  onClearAll() {
    this.notifications = this.notifications.map(n => ({...n, read: true}));
    this.notifications.forEach(n => {
      if (!n.read) this.markAsRead.emit(n.id);
    });
  }
}