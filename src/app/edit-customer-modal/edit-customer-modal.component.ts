import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Customer } from '../customers/customers';

@Component({
  selector: 'app-edit-customer-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-customer-modal.component.html',
  styleUrls: ['./edit-customer-modal.component.css']
})
export class EditCustomerModalComponent {
  @Input() customer!: Customer;
  @Output() save = new EventEmitter<Customer>();
  @Output() close = new EventEmitter<void>();

  editedCustomer: Customer = { ...this.customer };

  ngOnChanges() {
    this.editedCustomer = { ...this.customer };
  }

  saveChanges() {
    this.save.emit(this.editedCustomer);
  }

  closeModal() {
    this.close.emit();
  }
}
