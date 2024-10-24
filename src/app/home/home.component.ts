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

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks() {
    this.httpClient.get<Home[]>('https://book-api-bx2r.onrender.com/books')
      .subscribe((data: Home[]) => { 
        console.log(data);
        
        
        this.home = data.map(book => ({
          ...book,
          imageUrl: bookImages[book._id] || 'https://example.com/default.jpg' 
        }));
      });
  }
}
