import { Injectable } from '@angular/core';

import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap, map, finalize } from 'rxjs/operators';

@Injectable()
export class DataViewService {
  private length = new Subject<number>();
  private pageIndex = new Subject<number>();
  private loading = new BehaviorSubject<boolean>(true);
  private params = new BehaviorSubject<Parametros>(null);

  params$ = this.params.asObservable();
  length$ = this.length.asObservable();
  pageIndex$ = this.pageIndex.asObservable();
  loading$ = this.loading.asObservable();

  constructor() {}

  getData<T>(
    request: (params: Parametros) => Observable<HttpResponse<T>>
  ): Observable<T[]> {
    return this.params$.pipe(
      tap(() => this.loading.next(true)),
      switchMap((params) =>
        request(params).pipe(finalize(() => this.loading.next(false)))
      ),
      tap((result) => this.changeLength(result.length)),
      map((result) => result.data)
    );
  }

  changePagination(pagination: Paginacao) {
    this.params.next({ ...this.params.value, pagination });
    this.pageIndex.next(pagination.pageIndex);
  }

  changeFilter(filter: Filtro) {
    const pageIndex = 0;
    const current = { ...this.params?.value?.pagination };
    const pagination: Paginacao = { ...current, pageIndex };
    this.params.next({ ...this.params.value, filter, pagination });
    this.pageIndex.next(pageIndex);
  }

  changeSearch(search: string) {
    this.params.next({ ...this.params.value, search });
  }

  changeSort(value: Ordenacao) {
    const sort = value.direction ? value : null;
    this.params.next({ ...this.params.value, sort });
  }

  changeLength(value: number) {
    this.length.next(value);
  }

  changePage(value: number) {
    this.pageIndex.next(value);
  }
}
