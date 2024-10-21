import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  httpClient = inject(HttpClient);
  books: any[] = [];

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks() {
    this.httpClient.get('https://book-api-bx2r.onrender.com/books')
      .subscribe((data: any) => {
        console.log(data);
        this.books = data;
      });
  }
}
