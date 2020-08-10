import { Component, OnInit, Input, Type, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';

import { DataViewRenderService } from '../data-view-render.service';
import { FilterDirective } from './filter.directive';
import { DataViewService } from '../data-view.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() filter: Type<any>;

  @ViewChild(FilterDirective, { static: true }) filterHost: FilterDirective;

  opened$: Observable<boolean>;

  constructor(
    private stateService: DataViewService,
    private renderService: DataViewRenderService
  ) {}

  ngOnInit(): void {
    this.renderService.create(this.filter, this.filterHost.viewContainerRef);
    this.opened$ = this.stateService.filterOpened$;
  }

  closeFilter() {
    this.stateService.closeFilter();
  }
}
