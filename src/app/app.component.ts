import { ChangeDetectionStrategy, Component, OnInit, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { BookStore } from './store/book.store';
import { map, pipe, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { sign } from 'crypto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  providers: [BookStore],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit{

  readonly store = inject(BookStore);
  title = 'signal-store-demo';
  router = inject(Router);

  readonly logDoubledNumber = rxMethod<number>(
    // 👇 RxJS operators are chained together using the `pipe` function.
    pipe(
      map((num) => num * 2),
      tap(num => {
        console.log('from rxMethod----->',num)
      })
    )
  );
  constructor() {
    effect(() => {
      if(this.store.isLoading()) {
        console.log(" still getting data from back end system");

      }

      else if (!this.store.isLoading() && this.store.booksCount() > 0) {
        console.log(" Data loaded in the page");
        console.log("Number of books in the response is ---", this.store.booksCount());


      }
    })
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.store.loadAll();
    }, 5000);

    var numberSignal = signal<number>(10)
    console.log('logDoubledNumber----', this.logDoubledNumber(numberSignal));
    numberSignal.set(10)

  }



}
