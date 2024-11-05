import { Component, inject, OnInit, HostListener } from '@angular/core';
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
  filteredBooks: (Home & { imageUrl?: string })[] = [];
  dropdownVisible = false; // State to track dropdown visibility
  dropdownTimeout: any; // Timeout to manage closing delay

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
        this.filteredBooks = this.home; // Initially show all books
      });
  }

  filterBooks(filter: string) {
    if (filter === 'all') {
      this.filteredBooks = this.home; // Show all books
    } else if (filter === 'available') {
      this.filteredBooks = this.home.filter(book => book.available); // Show only available books
    } else if (filter === 'unavailable') {
      this.filteredBooks = this.home.filter(book => !book.available); // Show only unavailable books
    }
    this.closeDropdown(); // Hide dropdown after selection
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible; // Toggle dropdown visibility
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdown = document.getElementById('filterDropdown'); // Assuming the dropdown has this ID
    const filterButton = document.getElementById('filterButton'); // Assuming the main button has this ID

    if (this.dropdownVisible && dropdown && !dropdown.contains(target) && filterButton && !filterButton.contains(target)) {
      this.closeDropdown(); // Close the dropdown if clicking outside
    }
  }

  closeDropdown() {
    this.dropdownVisible = false; // Hide dropdown immediately
  }

  handleMouseEnter() {
    // Keep dropdown open on mouse enter
    this.dropdownVisible = true;
  }

  handleMouseLeave() {
    this.closeDropdown(); // Call closeDropdown to hide immediately
  }
}
