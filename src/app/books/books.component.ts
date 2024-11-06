import { Component, inject, OnInit, HostListener } from '@angular/core';
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
  filteredBooks: (Book & { imageUrl?: string })[] = [];
  dropdownVisible = false;
  dropdownTimeout: any;
  selectedBook: Book | null = null;
  isModalOpen = false;
  selectedBookForEdit: Book | null = null;
  isEditModalOpen = false;
  isAddModalOpen = false;
  searchQuery: string = '';  

  ngOnInit(): void {
    this.fetchBooks();
  }

 
  fetchBooks() {
    this.httpClient.get<Book[]>('https://book-api-bx2r.onrender.com/books')
      .subscribe((data: Book[]) => {
        this.books = data.map(book => ({
          ...book,
          imageUrl: bookImages[book._id] || bookImages['default'] 
        }));
        this.filteredBooks = this.books; 
      });
  }

 
  filterBooks(filter: string = 'all') {
    let booksToFilter = this.books;

    
    if (filter === 'available') {
      booksToFilter = booksToFilter.filter(book => book.available);
    } else if (filter === 'unavailable') {
      booksToFilter = booksToFilter.filter(book => !book.available);
    }
    
    
    const query = this.searchQuery.toLowerCase();
    this.filteredBooks = booksToFilter.filter(book => 
      book.name.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.type.toLowerCase().includes(query) ||
      book.year.toString().includes(query) ||
      book._id.toString().includes(query)
    );

    this.closeDropdown();
  }

  
  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.filterBooks(); 
  }

  
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdown = document.getElementById('filterDropdown');
    const filterButton = document.getElementById('filterButton');

    if (this.dropdownVisible && dropdown && !dropdown.contains(target) && filterButton && !filterButton.contains(target)) {
      this.closeDropdown();
    }
  }

  closeDropdown() {
    this.dropdownVisible = false; 
  }

  handleMouseEnter() {
    this.dropdownVisible = true;
  }

  handleMouseLeave() {
    this.closeDropdown(); 
  }

  
  addBook() {
    this.isAddModalOpen = true;
  }

  saveNewBook(newBook: Book) {
    this.isAddModalOpen = false;
    this.httpClient.post<Book>('https://book-api-bx2r.onrender.com/books', newBook)
      .subscribe((createdBook: Book) => {
        this.books.push(createdBook);
        this.filteredBooks = this.books; 
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
    this.filteredBooks = this.books; 
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
          this.books = this.books.filter(b => b._id !== book._id);
          this.filteredBooks = this.books; // Refresh filtered list
        });
    }
  }
}
