import { Component, OnInit, Input, Type } from '@angular/core';

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

  filterOpened$: Observable<boolean>;
  loading$: Observable<boolean>;

  constructor(private stateService: DataViewService) {}

  ngOnInit(): void {
    this.filterOpened$ = this.stateService.filterOpened$;
    this.loading$ = this.stateService.loading$;
  }
}
