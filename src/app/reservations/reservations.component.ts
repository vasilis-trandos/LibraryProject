import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Reservation } from './reservations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  httpClient = inject(HttpClient);
  reservations: any[] = [];

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations() {
    this.httpClient.get('https://book-api-bx2r.onrender.com/reservations')
      .subscribe((data: any) => {
        console.log(data);
        this.reservations = data;
      });
  }
  viewReservation(reservation: any) {
    console.log("View reservation:", reservation);
  }

  editReservation(reservation: any) {
    console.log("Edit reservation:", reservation);
  }

  deleteReservation(reservation: any) {
    console.log("Delete reservation:", reservation);
  }
}
