import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Reservation } from './reservations';
import { CommonModule } from '@angular/common';
import { AddReservationModalComponent } from '../add-reservation-modal/add-reservation-modal.component';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [HttpClientModule, CommonModule, AddReservationModalComponent],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  httpClient = inject(HttpClient);
  reservations: Reservation[] = [];
  filteredReservations: Reservation[] = [];
  isAddModalOpen = false;
  searchQuery: string = '';  

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations() {
    this.httpClient.get<Reservation[]>('https://book-api-bx2r.onrender.com/reservations')
      .subscribe((data: Reservation[]) => {
        this.reservations = data.filter(reservation => reservation.book && reservation.customer);
        this.filteredReservations = [...this.reservations]; 
      });
  }

  filterReservations() {
    const query = this.searchQuery.toLowerCase();
    this.filteredReservations = this.reservations.filter(reservation => 
      (reservation.book?.name?.toLowerCase().includes(query) || 
       reservation.customer?.name?.toLowerCase().includes(query) || 
       reservation.status.toLowerCase().includes(query))
    );
  }

  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.filterReservations(); 
  }

  addReservation() {
    this.isAddModalOpen = true;
  }

  saveNewReservation(newReservation: any) {
    this.isAddModalOpen = false;
    this.httpClient.post<Reservation>('https://book-api-bx2r.onrender.com/reservations', newReservation)
      .subscribe((createdReservation: Reservation) => {
        console.log('New reservation created:', createdReservation); 
        // Ανανεώνουμε τις κρατήσεις με την τελευταία λίστα από το API
        this.fetchReservations(); // Κάνει refresh τα δεδομένα και ανανεώνει την λίστα
      });
  }

  closeAddModal() {
    this.isAddModalOpen = false;
  }

  completeReservation(reservation: Reservation) {
    const url = `https://book-api-bx2r.onrender.com/reservations/${reservation._id}/complete`;
    this.httpClient.post(url, {}).subscribe({
      next: () => {
        console.log(`Reservation ${reservation._id} completed.`);
        reservation.status = "Completed";
      },
      error: err => console.error("Error completing reservation:", err)
    });
  }
}
