import { Component, OnInit, Input, Type, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';

import { DataViewService } from '../data-view.service';
import { DataViewRenderService } from '../data-view-render.service';
import { TableDirective } from './table.directive';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() table: Type<any>;

  @ViewChild(TableDirective, { static: true }) tableHost: TableDirective;

  loading$: Observable<boolean>;

  constructor(
    private stateService: DataViewService,
    private renderService: DataViewRenderService
  ) {}

  ngOnInit(): void {
    this.renderService.create(this.table, this.tableHost.viewContainerRef);
    this.loading$ = this.stateService.loading$;
  }
}
