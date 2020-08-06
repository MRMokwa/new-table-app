import { Component, OnInit, Input, ViewChild, Type } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { Observable } from 'rxjs';

import { TableDirective } from './table.directive';
import { FilterDirective } from './filter.directive';
import { DataViewService } from './data-view.service';
import { DataViewRenderService } from './data-view-render.service';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss'],
})
export class DataViewComponent implements OnInit {
  @Input() titulo: string;
  @Input() table: Type<any>;
  @Input() filter: Type<any>;

  @ViewChild(TableDirective, { static: true }) tableHost: TableDirective;

  length$: Observable<number>;
  pageIndex$: Observable<number>;
  pageSize$: Observable<number>;
  loading$: Observable<boolean>;
  filterOpened$: Observable<boolean>;
  pesquisando = false;

  constructor(
    private stateService: DataViewService,
    private renderService: DataViewRenderService
  ) {}

  ngOnInit(): void {
    this.renderService.create(this.table, this.tableHost.viewContainerRef);

    this.pageSize$ = this.stateService.pageSize$;
    this.length$ = this.stateService.length$;
    this.pageIndex$ = this.stateService.pageIndex$;
    this.loading$ = this.stateService.loading$;
    this.filterOpened$ = this.stateService.filterOpened$;
  }

  onPage(event: PageEvent) {
    const paginacao: Paginacao = {
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
    };

    this.stateService.changePagination(paginacao);
  }

  refresh() {
    this.stateService.refreshData();
  }

  openFilter() {
    this.stateService.openFilter();
  }
}
