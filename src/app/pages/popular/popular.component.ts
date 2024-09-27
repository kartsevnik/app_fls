import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { movieDB } from '../../models/api-movie-db';
import { MovieCategory } from '../../models/movie-category.enum';

import { select, Store } from '@ngrx/store';
import * as MoviesActions from '../../store/actions';
import { AppState } from '../../store/state';
import {
  selectCurrentCategoryMovies,
  selectCurrentCategoryLoading,
  selectCurrentCategoryCurrentPage
} from '../../store/selectors';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {

  movies$: Observable<movieDB[]>;
  isLoading$: Observable<boolean>;
  currentPage$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.movies$ = this.store.pipe(select(selectCurrentCategoryMovies));
    this.isLoading$ = this.store.pipe(select(selectCurrentCategoryLoading));
    this.currentPage$ = this.store.pipe(select(selectCurrentCategoryCurrentPage));
  }

  ngOnInit() {
    this.store.dispatch(MoviesActions.setSelectedCategory({ category: MovieCategory.Popular }));
  }

  loadNextPage() {
    this.store.dispatch(MoviesActions.loadMovies({ category: MovieCategory.Popular }));
  }
}
