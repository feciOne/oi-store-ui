import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductSearchService {
  private _searchTerm = '';
  private searchTerm$$ = new BehaviorSubject<string>('');
  searchTerm$!: Observable<string>;

  get searchTerm() {
    return this._searchTerm;
  }

  constructor() {
    this.searchTerm$ = this.searchTerm$$.asObservable();
  }

  updateSearchTerm(term: string): void {
    this._searchTerm = term; // set first
    this.searchTerm$$.next(term); // Order matters
  }
}
