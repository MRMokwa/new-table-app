import { Component, OnInit, Input, Type, OnDestroy } from '@angular/core';

import { Subscription, BehaviorSubject } from 'rxjs';

import { DataViewService } from './data-view.service';
import { MediaService } from './media.service';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss'],
})
export class DataViewComponent implements OnInit, OnDestroy {
  @Input() titulo: string;
  @Input() table: Type<any>;
  @Input() filter: Type<any>;
  @Input() margin: string;
  @Input() elevation: number = 2;

  filterOpened$ = this.stateService.filterOpened$;
  loading$ = this.stateService.loading$;
  filterMode$ = new BehaviorSubject<'over' | 'side'>('side');
  subscriptions = new Subscription();

  constructor(
    private stateService: DataViewService,
    private mediaService: MediaService
  ) {}

  ngOnInit(): void {
    this.listenMediaChange();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  close() {
    this.stateService.closeFilter();
  }

  listenMediaChange() {
    const subs = this.mediaService.media$.subscribe((values) =>
      this.filterMode$.next(values.includes('lt-md') ? 'over' : 'side')
    );
    this.subscriptions.add(subs);
  }

  getElevation() {
    return this.margin ? `mat-elevation-z${this.elevation}` : null;
  }
}
