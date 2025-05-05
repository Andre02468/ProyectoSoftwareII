export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Reservation {
  id: number;
  userId: number;
  hotelId: number;
  roomId: number;
  startDate: Date;
  endDate: Date;
  status: ReservationStatus;
  createdAt: Date;
  updatedAt: Date;
}
