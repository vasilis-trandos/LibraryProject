import { Book } from "../books/books";
import { Customer } from "../customers/customers";

export interface Reservation {
    _id: string;
    book: Book;
    customer: Customer;
    reservedOn: string;
    returnBy: string;
    status: string;
    __v: number;
    available: string;
}
