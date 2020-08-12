import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataViewStateService } from '../data-view-state.service';

interface FilterBadge {
  numFilters: number;
  hidden: boolean;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() titulo: string;

  constructor(private stateService: DataViewStateService) {}

  filterBadge$: Observable<FilterBadge>;

  ngOnInit(): void {
    this.filterBadge$ = this.stateService.params$.pipe(
      map((params) => this.mapFilterBadge(params))
    );
  }

  mapFilterBadge(params: Parametros) {
    const numFilters = params.filter ? Object.keys(params.filter).length : 0;
    const hidden = numFilters === 0;
    return <FilterBadge>{ numFilters, hidden };
  }

  refresh() {
    this.stateService.refreshData();
  }

  toggleFilter() {
    this.stateService.toggleFilter();
  }
}
