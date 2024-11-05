import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Reservation } from '../reservations/reservations';

@Component({
  selector: 'app-edit-reservation-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-reservation-modal.component.html',
  styleUrls: ['./edit-reservation-modal.component.css']
})
export class EditReservationModalComponent {
  @Input() reservation!: Reservation; // Λαμβάνει την κράτηση από το ReservationsComponent
  @Output() save = new EventEmitter<Reservation>();
  @Output() close = new EventEmitter<void>();

  editedReservation: Reservation = { ...this.reservation }; // Αντιγραφή της κράτησης για επεξεργασία

  ngOnChanges() {
    this.editedReservation = { ...this.reservation }; // Ανανεώνουμε την αντιγραφή κάθε φορά που αλλάζει το input
  }

  saveChanges() {
    this.save.emit(this.editedReservation); // Εκπομπή των ενημερωμένων δεδομένων
  }

  closeModal() {
    this.close.emit();
  }
}
