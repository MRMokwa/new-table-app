import { Injectable } from '@angular/core';

import { Subject, BehaviorSubject, Observable, merge } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

export const PAGE_SIZE_DEFAULT = 10;

@Injectable()
export class DataViewService {
  private length = new Subject<number>();
  private pageIndex = new Subject<number>();
  private loading = new BehaviorSubject(true);
  private refresh = new Subject<void>();
  private pageSize = new BehaviorSubject<number>(PAGE_SIZE_DEFAULT);
  private filterOpened = new BehaviorSubject(true);
  private params = new BehaviorSubject<Parametros>({
    pagination: { pageIndex: 0, pageSize: PAGE_SIZE_DEFAULT },
  });

  length$ = this.length.asObservable();
  pageIndex$ = this.pageIndex.asObservable();
  loading$ = this.loading.asObservable();
  refresh$ = this.refresh.asObservable();
  pageSize$ = this.pageSize.asObservable();
  filterOpened$ = this.filterOpened.asObservable();
  params$ = this.params.asObservable();

  constructor() {}

  getData<T>(
    request: (params: Parametros) => Observable<HttpResponse<T>>
  ): Observable<T[]> {
    const stream$ = merge(this.params$, this.refresh$).pipe(
      map(() => this.params.value)
    );

    return stream$.pipe(
      tap(() => this.loading.next(true)),
      switchMap((params) => request(params)),
      tap((result) => this.changeLength(result.length)),
      map((result) => result.data),
      tap(() => this.loading.next(false))
    );
  }

  changePagination(pagination: Paginacao) {
    this.params.next({ ...this.params.value, pagination });
    this.pageIndex.next(pagination.pageIndex);
  }

  changeFilter(filter: Filtro) {
    const pageIndex = 0;
    const current = { ...this.params?.value?.pagination };
    const pagination = { ...current, pageIndex } as Paginacao;
    this.params.next({ ...this.params.value, filter, pagination });
    this.pageIndex.next(pageIndex);
  }

  changeSearch(search: string) {
    const pageIndex = 0;
    const current = { ...this.params?.value?.pagination };
    const pagination = { ...current, pageIndex } as Paginacao;
    this.params.next({ ...this.params.value, search, pagination });
    this.pageIndex.next(pageIndex);
  }

  changeSort(value: Ordenacao) {
    const sort = value.direction ? value : null;
    this.params.next({ ...this.params.value, sort });
  }

  changeLength(value: number) {
    this.length.next(value);
  }

  refreshData() {
    this.refresh.next();
  }

  toggleFilter() {
    this.filterOpened.next(!this.filterOpened.value);
  }

  openFilter() {
    this.filterOpened.next(true);
  }

  closeFilter() {
    this.filterOpened.next(false);
  }
}
