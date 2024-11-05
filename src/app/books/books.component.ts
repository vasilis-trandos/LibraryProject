import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Book } from './books';
import { CommonModule } from '@angular/common';
import { bookImages } from '../images';
import { ViewBookModalComponent } from '../view-book-modal/view-book-modal.component';
import { EditBookModalComponent } from '../edit-book-modal/edit-book-modal.component';
import { AddBookModalComponent } from '../add-book-modal/add-book-modal.component';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ViewBookModalComponent, EditBookModalComponent, AddBookModalComponent],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  httpClient = inject(HttpClient);
  books: (Book & { imageUrl?: string })[] = [];
  selectedBook: Book | null = null;
  isModalOpen = false;
  selectedBookForEdit: Book | null = null;
  isEditModalOpen = false;
  isAddModalOpen = false;

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks() {
    this.httpClient.get<Book[]>('https://book-api-bx2r.onrender.com/books')
      .subscribe((data: Book[]) => {
        this.books = data.map(book => ({
          ...book,
          imageUrl: bookImages[book._id] || 'https://example.com/default.jpg'
        }));
      });
  }

  addBook() {
    this.isAddModalOpen = true;
  }

  saveNewBook(newBook: Book) {
    this.isAddModalOpen = false;
    this.httpClient.post<Book>('https://book-api-bx2r.onrender.com/books', newBook)
      .subscribe((createdBook: Book) => {
        this.books.push(createdBook);
      });
  }

  closeAddModal() {
    this.isAddModalOpen = false;
  }

  viewBook(book: Book) {
    this.selectedBook = book;
    this.isModalOpen = true;
  }

  editBook(book: Book) {
    this.selectedBookForEdit = book;
    this.isEditModalOpen = true;
  }

  saveBookChanges(updatedBook: Book) {
    this.books = this.books.map(b => b._id === updatedBook._id ? updatedBook : b);
    this.isEditModalOpen = false;
    this.httpClient.put(`https://book-api-bx2r.onrender.com/books/${updatedBook._id}`, updatedBook)
      .subscribe(response => console.log("Book updated:", response));
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedBook = null;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedBookForEdit = null;
  }

  deleteBook(book: Book) {
    if (confirm(`Are you sure you want to delete the book "${book.name}"?`)) {
      this.httpClient.delete(`https://book-api-bx2r.onrender.com/books/${book._id}`)
        .subscribe(() => {
          console.log("Book deleted:", book);
          this.books = this.books.filter(b => b._id !== book._id);
        });
    }
  }
}
