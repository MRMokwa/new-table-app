import { Component, OnInit, Input, Type } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { Observable } from 'rxjs';

import { DataViewService } from './data-view.service';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss'],
})
export class DataViewComponent implements OnInit {
  @Input() titulo: string;
  @Input() table: Type<any>;
  @Input() filter: Type<any>;

  length$: Observable<number>;
  pageIndex$: Observable<number>;
  pageSize$: Observable<number>;
  filterOpened$: Observable<boolean>;

  constructor(private stateService: DataViewService) {}

  ngOnInit(): void {
    this.pageSize$ = this.stateService.pageSize$;
    this.length$ = this.stateService.length$;
    this.pageIndex$ = this.stateService.pageIndex$;
    this.filterOpened$ = this.stateService.filterOpened$;
  }

  onPage(event: PageEvent) {
    const paginacao: Paginacao = {
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
    };

    this.stateService.changePagination(paginacao);
  }
}
