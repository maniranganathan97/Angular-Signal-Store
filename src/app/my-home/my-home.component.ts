import { Component, OnInit, inject } from '@angular/core';
import { BookStore } from '../store/book.store';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-home',
  standalone: true,
  imports: [CommonModule ],
  providers: [BookStore],
  templateUrl: './my-home.component.html',
  styleUrl: './my-home.component.css'
})
export class MyHomeComponent implements OnInit{

  readonly store = inject(BookStore);
  title = 'signal-store-demo';
  router = inject(Router);

  ngOnInit(): void {
    setTimeout(() => {
      this.store.loadAllBooks();
    }, 5000)
  }

  navigate(): void {
    this.router.navigate(['/new'])
  }
}
