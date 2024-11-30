import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Root } from '../model/book';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class BookService {
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Root> {
    return this.httpClient.get<Root>(`https://www.googleapis.com/books/v1/volumes?maxResults=5&orderBy=relevance&q=oliver%20sacks`);
  }

}
