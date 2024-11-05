import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-book-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-book-modal.component.html',
  styleUrls: ['./add-book-modal.component.css']
})
export class AddBookModalComponent {
  newBook = {
    name: '',
    year: 1900,
    type: 'Fiction',
    author: '',
    createdOn: new Date().toISOString()
  };

  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  saveBook() {
    this.save.emit(this.newBook);
  }

  closeModal() {
    this.close.emit();
  }
}
