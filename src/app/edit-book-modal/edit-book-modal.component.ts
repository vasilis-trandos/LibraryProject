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
  @Input() book!: Book; // Λαμβάνει το βιβλίο από το BooksComponent
  @Output() save = new EventEmitter<Book>();
  @Output() close = new EventEmitter<void>();

  editedBook: Book = { ...this.book }; // Αντιγραφή του βιβλίου για να κάνουμε αλλαγές

  ngOnChanges() {
    this.editedBook = { ...this.book }; // Ανανεώνουμε την αντιγραφή κάθε φορά που αλλάζει το input
  }

  saveChanges() {
    this.save.emit(this.editedBook); // Εκπομπή του ενημερωμένου βιβλίου
  }

  closeModal() {
    this.close.emit();
  }
}
