import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Customer } from '../customers/customers';

@Component({
  selector: 'app-add-customer-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-customer-modal.component.html',
  styleUrls: ['./add-customer-modal.component.css']
})
export class AddCustomerModalComponent {
  newCustomer: Customer = {
    _id: '',
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
  };

  @Output() save = new EventEmitter<Customer>();
  @Output() close = new EventEmitter<void>();

  saveCustomer() {
    this.save.emit(this.newCustomer);
  }

  closeModal() {
    this.close.emit();
  }
}
