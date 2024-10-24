import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Customer } from './customers';  // Εισαγωγή του interface Customer
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  httpClient = inject(HttpClient);
  customers: Customer[] = [];

  ngOnInit(): void {
    this.fetchCustomers();
  }

  fetchCustomers() {
    this.httpClient.get<Customer[]>('https://book-api-bx2r.onrender.com/customers')
      .subscribe((data: Customer[]) => { 
        console.log(data);
        this.customers = data;
      });
  }
}


