import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-reservation-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-reservation-modal.component.html',
  styleUrls: ['./add-reservation-modal.component.css']
})
export class AddReservationModalComponent implements OnInit {
  books: any[] = [];
  customers: any[] = [];
  newReservation = {
    bookId: '',
    customerId: '',
    returnBy: ''
  };

  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBooks();
    this.fetchCustomers();
  }

  fetchBooks() {
    this.http.get('https://book-api-bx2r.onrender.com/books').subscribe((data: any) => {
      this.books = data;
    });
  }

  fetchCustomers() {
    this.http.get('https://book-api-bx2r.onrender.com/customers').subscribe((data: any) => {
      this.customers = data;
    });
  }

  saveReservation() {
    this.save.emit(this.newReservation);
  }

  closeModal() {
    this.close.emit();
  }
}
