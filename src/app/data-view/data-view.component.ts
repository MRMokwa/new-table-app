import {
  Component,
  OnInit,
  Input,
  ComponentFactoryResolver,
  ViewChild,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { Observable, of } from 'rxjs';

import { TableDirective } from './table.directive';
import { FilterDirective } from './filter.directive';
import { DataViewService } from './data-view.service';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss'],
})
export class DataViewComponent implements OnInit {
  @Input() title: string;
  @Input() table: Type<any>;
  @Input() filter: Type<any>;

  @ViewChild(TableDirective, { static: true }) tableHost: TableDirective;
  @ViewChild(FilterDirective, { static: true }) filterHost: FilterDirective;

  length$: Observable<number>;
  pageIndex$: Observable<number>;
  pageSize$: Observable<number>;
  loading$: Observable<boolean>;
  opened = true;
  pesquisando = false;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private stateService: DataViewService
  ) {}

  ngOnInit(): void {
    this.createComponent(this.table, this.tableHost.viewContainerRef);
    this.createComponent(this.filter, this.filterHost.viewContainerRef);

    this.pageSize$ = this.stateService.pageSize$;
    this.length$ = this.stateService.length$;
    this.pageIndex$ = this.stateService.pageIndex$;
    this.loading$ = this.stateService.loading$;
  }

  createComponent(component: Type<any>, viewContainerRef: ViewContainerRef) {
    viewContainerRef.clear();
    if (!component) return;
    viewContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(component)
    );
  }

  onPage(event: PageEvent) {
    this.stateService.changePagination(event);
  }

  onFilter(event: any) {
    this.stateService.changeFilter(event);
  }

  refresh() {
    this.stateService.refreshData();
  }
}
