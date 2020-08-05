import { Injectable } from '@angular/core';

import { Subject, BehaviorSubject, Observable, merge } from 'rxjs';
import { switchMap, tap, map, finalize } from 'rxjs/operators';

@Injectable()
export class DataViewService {
  private length = new Subject<number>();
  private pageIndex = new Subject<number>();
  private loading = new BehaviorSubject<boolean>(true);
  private params = new BehaviorSubject<Parametros>({
    pagination: { pageIndex: 0, pageSize: 10 },
  });
  private refresh = new Subject<void>();
  private pageSize = new BehaviorSubject<number>(10);

  params$ = this.params.asObservable();
  length$ = this.length.asObservable();
  pageIndex$ = this.pageIndex.asObservable();
  loading$ = this.loading.asObservable();
  refresh$ = this.refresh.asObservable();
  pageSize$ = this.pageSize.asObservable();

  constructor() {}

  getData<T>(
    request: (params: Parametros) => Observable<HttpResponse<T>>
  ): Observable<T[]> {
    const stream$ = merge(this.params$, this.refresh$).pipe(
      map(() => this.params.value)
    );

    return stream$.pipe(
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
    // Ao aplicar a fitrlo, voltar para primeira pagina
    const pageIndex = 0;
    const current = { ...this.params?.value?.pagination };
    const pagination = { ...current, pageIndex } as Paginacao;

    this.params.next({ ...this.params.value, filter, pagination });
    this.pageIndex.next(pageIndex);
  }

  changeSearch(search: string) {
    // Ao aplicar a pesquisa, voltar para primeira pagina
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
}
