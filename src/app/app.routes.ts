import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { CustomersComponent } from './customers/customers.component';




export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'books', component: BooksComponent},
    { path: 'reservations', component: ReservationsComponent},
    { path: 'customers', component: CustomersComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' }
    
    

];
