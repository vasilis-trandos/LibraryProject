import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Customer } from './customers';
import { CommonModule } from '@angular/common';
import { ViewCustomerModalComponent } from '../view-customer-modal/view-customer-modal.component';
import { EditCustomerModalComponent } from '../edit-customer-modal/edit-customer-modal.component';
import { AddCustomerModalComponent } from '../add-customer-modal/add-customer-modal.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ViewCustomerModalComponent, EditCustomerModalComponent, AddCustomerModalComponent],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  httpClient = inject(HttpClient);
  customers: Customer[] = [];
  filteredCustomers: Customer[] = []; 
  selectedCustomer: Customer | null = null;
  selectedCustomerForEdit: Customer | null = null;
  isModalOpen = false;
  isEditModalOpen = false;
  isAddModalOpen = false;
  searchQuery: string = '';

  ngOnInit(): void {
    this.fetchCustomers();
  }

 
  fetchCustomers() {
    this.httpClient.get<Customer[]>('https://book-api-bx2r.onrender.com/customers')
      .subscribe((data: Customer[]) => {
        this.customers = data;
        this.filteredCustomers = data; 
      });
  }

  
  filterCustomers() {
    if (!this.searchQuery) {
      this.filteredCustomers = this.customers; 
      return;
    }
    const query = this.searchQuery.toLowerCase();
    this.filteredCustomers = this.customers.filter(customer =>
      customer.name.toLowerCase().includes(query) ||
      customer.surname.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      customer.phoneNumber.toString().includes(query)
    );
  }

  
  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.filterCustomers(); 
  }

  
  viewCustomer(customer: Customer) {
    this.selectedCustomer = customer;
    this.isModalOpen = true;
  }

  
  editCustomer(customer: Customer) {
    this.selectedCustomerForEdit = customer;
    this.isEditModalOpen = true;
  }

  
  saveCustomerChanges(updatedCustomer: Customer) {
    this.isEditModalOpen = false;
    this.httpClient.put(`https://book-api-bx2r.onrender.com/customers/${updatedCustomer._id}`, updatedCustomer)
      .subscribe(response => {
        console.log("Customer updated:", response);
       
        this.customers = this.customers.map(c => c._id === updatedCustomer._id ? updatedCustomer : c);
        this.filterCustomers(); 
      });
  }

  
  deleteCustomer(customer: Customer) {
    if (confirm(`Are you sure you want to delete customer "${customer.name} ${customer.surname}"?`)) {
      this.httpClient.delete(`https://book-api-bx2r.onrender.com/customers/${customer._id}`)
        .subscribe(() => {
          console.log("Customer deleted:", customer);
          this.customers = this.customers.filter(c => c._id !== customer._id);
          this.filterCustomers(); 
        });
    }
  }

  
  closeModal() {
    this.isModalOpen = false;
    this.selectedCustomer = null;
  }

  
  addCustomer() {
    this.isAddModalOpen = true;
  }

  
  saveNewCustomer(newCustomer: Customer) {
    this.isAddModalOpen = false;
    this.httpClient.post<Customer>('https://book-api-bx2r.onrender.com/customers', newCustomer)
      .subscribe((createdCustomer: Customer) => {
        console.log("New customer added:", createdCustomer);
       
        this.customers.push(createdCustomer);
        this.filterCustomers(); 
      });
  }

  
  closeAddModal() {
    this.isAddModalOpen = false;
  }

  
  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedCustomerForEdit = null;
  }
}
