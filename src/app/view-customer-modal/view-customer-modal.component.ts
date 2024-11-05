import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from '../customers/customers';

@Component({
  selector: 'app-view-customer-modal',
  standalone: true,
  templateUrl: './view-customer-modal.component.html',
  styleUrls: ['./view-customer-modal.component.css']
})
export class ViewCustomerModalComponent {
  @Input() customer!: Customer;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
