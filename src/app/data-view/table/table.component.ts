import { Component, OnInit, Input, Type, ViewChild } from '@angular/core';

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

  constructor(private renderService: DataViewRenderService) {}

  ngOnInit(): void {
    this.renderService.create(this.table, this.tableHost.viewContainerRef);
  }
}
