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
  selectedCustomer: Customer | null = null;
  selectedCustomerForEdit: Customer | null = null;
  isModalOpen = false;
  isEditModalOpen = false;
  isAddModalOpen = false;

  ngOnInit(): void {
    this.fetchCustomers();
  }

  // Fetch the list of customers from the API
  fetchCustomers() {
    this.httpClient.get<Customer[]>('https://book-api-bx2r.onrender.com/customers')
      .subscribe((data: Customer[]) => {
        this.customers = data;
      });
  }

  // View customer details
  viewCustomer(customer: Customer) {
    this.selectedCustomer = customer;
    this.isModalOpen = true;
  }

  // Edit an existing customer
  editCustomer(customer: Customer) {
    this.selectedCustomerForEdit = customer;
    this.isEditModalOpen = true;
  }

  // Save changes to an existing customer
  saveCustomerChanges(updatedCustomer: Customer) {
    this.isEditModalOpen = false;
    this.httpClient.put(`https://book-api-bx2r.onrender.com/customers/${updatedCustomer._id}`, updatedCustomer)
      .subscribe(response => {
        console.log("Customer updated:", response);
        // Update the local list of customers
        this.customers = this.customers.map(c => c._id === updatedCustomer._id ? updatedCustomer : c);
      });
  }

  // Delete a customer
  deleteCustomer(customer: Customer) {
    if (confirm(`Are you sure you want to delete customer "${customer.name} ${customer.surname}"?`)) {
      this.httpClient.delete(`https://book-api-bx2r.onrender.com/customers/${customer._id}`)
        .subscribe(() => {
          console.log("Customer deleted:", customer);
          this.customers = this.customers.filter(c => c._id !== customer._id);
        });
    }
  }

  // Close the view modal
  closeModal() {
    this.isModalOpen = false;
    this.selectedCustomer = null;
  }

  // Open the add customer modal
  addCustomer() {
    this.isAddModalOpen = true;
  }

  // Save a new customer
  saveNewCustomer(newCustomer: Customer) {
    this.isAddModalOpen = false;
    this.httpClient.post<Customer>('https://book-api-bx2r.onrender.com/customers', newCustomer)
      .subscribe((createdCustomer: Customer) => {
        console.log("New customer added:", createdCustomer);
        // Add the new customer to the local list
        this.customers.push(createdCustomer);
      });
  }

  // Close the add customer modal
  closeAddModal() {
    this.isAddModalOpen = false;
  }

  // Close the edit modal
  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedCustomerForEdit = null;
  }
}
