import { Component, OnInit, Input } from '@angular/core';

import { DataViewService } from '../data-view.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(private stateService: DataViewService) {}

  filterOpened$: Observable<boolean>;
  pesquisando = false;
  filterBadge$: Observable<FilterBadge>;

  ngOnInit(): void {
    this.filterOpened$ = this.stateService.filterOpened$;

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
