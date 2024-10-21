import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [HttpClientModule],
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
    this.httpClient.get(' https://book-api-bx2r.onrender.com/reservations') // Replace with your API endpoint
      .subscribe((data: any) => {
        console.log(data);
        this.reservations = data;
      });
  }
}