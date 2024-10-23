import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Book } from './books';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [HttpClientModule, CommonModule], 
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  httpClient = inject(HttpClient);
  books: Book[] = []; 

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks() {
    this.httpClient.get<Book[]>('https://book-api-bx2r.onrender.com/books') 
      .subscribe((data: Book[]) => { 
        console.log(data);
        this.books = data; 
      });
  }
}
