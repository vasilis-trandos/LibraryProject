import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Home } from './home';
import { bookImages } from '../images';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  httpClient = inject(HttpClient);
  home: (Home & { imageUrl?: string })[] = [];
  availableBooks: (Home & { imageUrl?: string })[] = []; 
  searchQuery: string = ''; 

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks() {
    this.httpClient.get<Home[]>('https://book-api-bx2r.onrender.com/books')
      .subscribe((data: Home[]) => {
        console.log(data);
        this.home = data.map(book => ({
          ...book,
          imageUrl: bookImages[book._id] || bookImages['default'] 
        }));
        
        this.availableBooks = this.home.filter(book => book.available);
      });
  }

  
  filterBooks() {
    return this.availableBooks.filter(book => 
      book.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  
  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
  }
}
