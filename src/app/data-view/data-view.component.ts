import { Component, OnInit, Input, Type, OnDestroy } from '@angular/core';

import { Observable, Subscription, BehaviorSubject } from 'rxjs';

import { DataViewService } from './data-view.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss'],
})
export class DataViewComponent implements OnInit, OnDestroy {
  @Input() titulo: string;
  @Input() table: Type<any>;
  @Input() filter: Type<any>;

  filterOpened$: Observable<boolean>;
  loading$: Observable<boolean>;
  filterMode$ = new BehaviorSubject<string>('side');
  subscriptions = new Subscription();

  constructor(
    private stateService: DataViewService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.filterOpened$ = this.stateService.filterOpened$;
    this.loading$ = this.stateService.loading$;

    const pageResize = this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((state) =>
        this.filterMode$.next(state.matches ? 'over' : 'side')
      );

    this.subscriptions.add(pageResize);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
