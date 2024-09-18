import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { movieDB } from '../../models/api-movie-db';
import * as MoviesActions from '../../store/actions';
import { selectPopularMovies, selectLoadingPopular, selectPopularCurrentPage } from '../../store/selectors';
import { AppState } from '../../store/state';  // Используем AppState вместо MoviesState

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {

  popularMovies$: Observable<movieDB[]>;
  isLoading$: Observable<boolean>;
  currentPage$: Observable<number>;
  loadingPopular$: Observable<boolean>;

  //Store: Инжектируется в компонент для взаимодействия с хранилищем. Используется для отправки действий и подписки на изменения состояния.
  constructor(private store: Store<AppState>) {  // Используем AppState вместо MoviesState
    this.popularMovies$ = this.store.select(selectPopularMovies); //select: Метод, который выбирает часть состояния из хранилища, используя селекторы.
    this.isLoading$ = this.store.select(selectLoadingPopular);
    this.currentPage$ = this.store.select(selectPopularCurrentPage);
    this.loadingPopular$ = this.store.select(selectLoadingPopular);
  }

  ngOnInit() {
    this.store.dispatch(MoviesActions.loadPopularMovies()); // dispatch: Метод, который отправляет действие в хранилище для изменения состояния.
  }

  loadNextPage() {
    this.store.dispatch(MoviesActions.loadPopularMovies());  // Загружаем следующую страницу
  }
}
