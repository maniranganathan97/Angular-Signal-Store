import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookStore } from '../store/book.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-new',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './my-new.component.html',
  styleUrl: './my-new.component.css',
  providers: [BookStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyNewComponent implements OnInit{

  readonly store = inject(BookStore);
  title = 'signal-store-demo';
  router = inject(Router);

  ngOnInit(): void {
    setTimeout(() => {
      this.store.loadAllBooks();
    }, 5000)
  }

  navigate(): void {
    this.router.navigate(['/'])
  }
}
