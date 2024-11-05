import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../books/books';

@Component({
  selector: 'app-view-book-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-book-modal.component.html',
  styleUrls: ['./view-book-modal.component.css']
})
export class ViewBookModalComponent {
  @Input() book!: Book;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
