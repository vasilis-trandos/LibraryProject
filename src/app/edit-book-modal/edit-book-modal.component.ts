import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book } from '../books/books';

@Component({
  selector: 'app-edit-book-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-book-modal.component.html',
  styleUrls: ['./edit-book-modal.component.css']
})
export class EditBookModalComponent {
  @Input() book!: Book; 
  @Output() save = new EventEmitter<Book>();
  @Output() close = new EventEmitter<void>();

  editedBook: Book = { ...this.book }; 

  ngOnChanges() {
    this.editedBook = { ...this.book }; 
  }

  saveChanges() {
    this.save.emit(this.editedBook); 
  }

  closeModal() {
    this.close.emit();
  }
}
