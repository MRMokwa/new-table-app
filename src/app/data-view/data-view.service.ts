import { Injectable } from '@angular/core';

import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap, map, finalize, merge } from 'rxjs/operators';

@Injectable()
export class DataViewService {
  private length = new Subject<number>();
  private pageIndex = new Subject<number>();
  private loading = new BehaviorSubject<boolean>(true);
  private params = new BehaviorSubject<Parametros>(null);
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
    const defaultPagination: Paginacao = {
      pageSize: this.pageSize.value, //TODO: Deve usar a do servico de config
      pageIndex: 0,
    };

    return this.params$.pipe(
      merge(this.refresh$),
      tap(() => this.loading.next(true)),
      map(() => <Parametros>{ ...this.params.value, pagination: this.params.value?.pagination || defaultPagination }),
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
