import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Root } from "../model/book";
import { BookService } from "../service/book.service";
import { Observable, exhaustMap, of, pipe, tap } from "rxjs";
import { Injectable, computed, inject } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { tapResponse } from '@ngrx/operators';

type BookState = {
  root: Root;
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
}

const initalState: BookState = {
  root: {
    kind: "",
    totalItems: 0,
    items: []
  },
  isLoading: true,
  filter: { query: '', order: 'asc' },
}
export const BookStore = signalStore(
  // { providedIn: 'root' },
  withState(initalState),
  withMethods((store, booksService = inject(BookService)) => ({
    /* ... */
    // 👇 Defining a method to load all books.
    async loadAll(): Promise<void> {
      patchState(store, { isLoading: true });

      const root = booksService.getAll().subscribe((root => {
        patchState(store, { root, isLoading: false });
      }));

    },

    loadAllBooks: rxMethod<void> (
     pipe(
      tap(() => patchState(store, { isLoading: true})),
      exhaustMap(() => {
        return booksService.getAll().pipe(
          tapResponse({
            next: (dataRoot) => patchState(store, {root: dataRoot, isLoading: false}),
            error: (err) => {
              patchState(store, {isLoading: true}),
              console.error(err);
            }
          })
        )
      })
     )
    )
  })),

  withComputed(({root, filter})=> ({
    booksCount: computed(() => root().items.length)
  }))
)
