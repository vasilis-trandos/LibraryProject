import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Reservation } from './reservations';
import { CommonModule } from '@angular/common';
import { ViewReservationModalComponent } from '../view-reservation-modal/view-reservation-modal.component';
import { EditReservationModalComponent } from '../edit-reservation-modal/edit-reservation-modal.component';
import { AddReservationModalComponent } from '../add-reservation-modal/add-reservation-modal.component';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ViewReservationModalComponent, EditReservationModalComponent, AddReservationModalComponent],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  httpClient = inject(HttpClient);
  reservations: Reservation[] = [];
  filteredReservations: Reservation[] = [];  
  selectedReservation: Reservation | null = null;
  isModalOpen = false;
  selectedReservationForEdit: Reservation | null = null;
  isEditModalOpen = false;
  isAddModalOpen = false;
  searchQuery: string = '';  

  ngOnInit(): void {
    this.fetchReservations();
  }

  
  fetchReservations() {
    this.httpClient.get<Reservation[]>('https://book-api-bx2r.onrender.com/reservations')
      .subscribe((data: Reservation[]) => {
        this.reservations = data;
        this.filteredReservations = [...this.reservations]; 
      });
  }

  
  filterReservations() {
    const query = this.searchQuery.toLowerCase();

    this.filteredReservations = this.reservations.filter(reservation => 
      reservation.book.name.toLowerCase().includes(query) ||
      reservation.customer.name.toLowerCase().includes(query) ||
      reservation.status.toLowerCase().includes(query)
    );
  }

  
  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.filterReservations(); 
  }

  viewReservation(reservation: Reservation) {
    this.selectedReservation = reservation;
    this.isModalOpen = true;
  }

  editReservation(reservation: Reservation) {
    this.selectedReservationForEdit = reservation;
    this.isEditModalOpen = true;
  }

  addReservation() {
    this.isAddModalOpen = true;
  }

  saveNewReservation(newReservation: any) {
    this.isAddModalOpen = false;
    this.httpClient.post<Reservation>('https://book-api-bx2r.onrender.com/reservations', newReservation)
      .subscribe((createdReservation: Reservation) => {
        console.log('New reservation created:', createdReservation); 
        this.reservations.push(createdReservation);
        this.filteredReservations = [...this.reservations]; 
        this.filterReservations(); 
      });
  }

  closeAddModal() {
    this.isAddModalOpen = false;
  }

  saveReservationChanges(updatedReservation: Reservation) {
    this.reservations = this.reservations.map(r => r._id === updatedReservation._id ? updatedReservation : r);
    this.filteredReservations = [...this.reservations]; 
    this.isEditModalOpen = false;

    this.httpClient.put(`https://book-api-bx2r.onrender.com/reservations/${updatedReservation._id}`, updatedReservation)
      .subscribe(response => console.log("Reservation updated:", response));
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedReservation = null;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedReservationForEdit = null;
  }

  deleteReservation(reservation: Reservation) {
    if (confirm(`Are you sure you want to delete the reservation for "${reservation.book.name}" by "${reservation.customer.name}"?`)) {
      this.httpClient.delete(`https://book-api-bx2r.onrender.com/reservations/${reservation._id}`)
        .subscribe(() => {
          console.log("Reservation deleted:", reservation);
          this.reservations = this.reservations.filter(r => r._id !== reservation._id);
          this.filteredReservations = [...this.reservations]; 
        });
    }
  }
}
