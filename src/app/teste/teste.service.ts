import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { PERSON_DATA } from './teste.data';

@Injectable({
  providedIn: 'root',
})
export class TesteService {
  constructor() {}

  getAll(params?: Parametros): Observable<HttpResponse<Person>> {
    // Pesquisa
    let searchedData = JSON.parse(JSON.stringify(PERSON_DATA)) as Person[];

    if (params?.search) {
      const search = params.search.toLowerCase();
      searchedData = searchedData.filter(
        (pessoa) =>
          pessoa.email.toLowerCase().includes(search) ||
          pessoa.name.first.toLowerCase().includes(search) ||
          pessoa.name.last.toLowerCase().includes(search) ||
          pessoa.company.toLowerCase().includes(search)
      );
    }

    // Sort
    let sortedData = searchedData;

    switch (params?.sort?.active) {
      case 'id':
        sortedData.sort((a, b) => a.id - b.id);
        break;

      case 'first-name':
        sortedData.sort((a, b) => (a.name.first > b.name.first ? 1 : -1));
        break;

      case 'last-name':
        sortedData.sort((a, b) => (a.name.last > b.name.last ? 1 : -1));
        break;

      case 'age':
        sortedData.sort((a, b) => a.age - b.age);
        break;

      case 'company':
        sortedData.sort((a, b) => (a.company > b.company ? 1 : -1));
        break;

      case 'email':
        sortedData.sort((a, b) => (a.email > b.email ? 1 : -1));
        break;

      default:
        break;
    }

    if (params?.sort?.direction === 'desc') {
      sortedData.reverse();
    }

    // Filter
    let filteredData = sortedData;

    if (params?.filter?.idadeMax) {
      filteredData = filteredData.filter(
        (p) => p.age <= params.filter.idadeMax
      );
    }

    // Pagination
    const pageIndex = params?.pagination?.pageIndex || 0;
    const pageSize = params?.pagination?.pageSize || 50;

    const start = pageIndex * pageSize;
    const end = start + pageSize;

    return of(filteredData).pipe(
      delay(300),
      map((data: any[]) => data.slice(start, end)),
      map((data) => ({ data, length: filteredData.length }))
    );
  }
}
