import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataViewService } from '../data-view.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  length$: Observable<number>;
  pageIndex$: Observable<number>;
  pageSize$: Observable<number>;

  constructor(private stateService: DataViewService) {}

  ngOnInit(): void {
    this.pageSize$ = this.stateService.pageSize$;
    this.length$ = this.stateService.length$;
    this.pageIndex$ = this.stateService.pageIndex$;
  }

  onPage(event: PageEvent) {
    const paginacao: Paginacao = {
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
    };

    this.stateService.changePagination(paginacao);
  }
}
