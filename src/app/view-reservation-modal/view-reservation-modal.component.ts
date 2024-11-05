import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Εισαγωγή του CommonModule
import { Reservation } from '../reservations/reservations';

@Component({
  selector: 'app-view-reservation-modal',
  standalone: true,
  imports: [CommonModule], // Προσθήκη του CommonModule στα imports
  templateUrl: './view-reservation-modal.component.html',
  styleUrls: ['./view-reservation-modal.component.css']
})
export class ViewReservationModalComponent {
  @Input() reservation!: Reservation;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
