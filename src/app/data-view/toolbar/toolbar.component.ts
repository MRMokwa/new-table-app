import { Component, OnInit, Input } from '@angular/core';

import { DataViewService } from '../data-view.service';
import { Observable } from 'rxjs';

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

  ngOnInit(): void {
    this.filterOpened$ = this.stateService.filterOpened$;
  }

  refresh() {
    this.stateService.refreshData();
  }

  openFilter() {
    this.stateService.openFilter();
  }
}
