import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Book } from './books';
import { CommonModule } from '@angular/common';
import { bookImages } from '../images';
 
@Component({
  selector: 'app-books',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  httpClient = inject(HttpClient);
  books: (Book & {imageUrl?: string}) [] = [];
 
  ngOnInit(): void {
    this.fetchBooks();
  }
 
  fetchBooks() {
    this.httpClient.get<Book[]>('https://book-api-bx2r.onrender.com/books')
      .subscribe((data: Book[]) => {
        console.log(data);
        this.books = data;
        this.books = data.map (book=>({
          ...book,
          imageUrl: bookImages[book._id] || 'https://example.com/default.jpg%27'
        }))
      });
  }

  viewBook(book: Book) {
    console.log("View book:", book);
  }

  editBook(book: Book) {
    console.log("Edit book:", book);
  }

  deleteBook(book: Book) {
    console.log("Delete book:", book);
  }
}