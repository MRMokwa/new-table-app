interface HttpResponse<T> {
  data: T[];
  length: number;
}

interface Parametros {
  pagination?: Paginacao;
  filter?: Filtro;
  sort?: Ordenacao;
}

interface Filtro {
  [key: string]: string | number | boolean | Date;
}

interface Ordenacao {
  active: string;
  direction: 'asc' | 'desc';
}

interface Paginacao {
  pageIndex: number;
  pageSize: number;
}
