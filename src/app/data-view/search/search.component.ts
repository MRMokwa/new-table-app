import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { DataViewService } from '../data-view.service';
import { SEARCH_ANIMATIONS } from './search.component.animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: SEARCH_ANIMATIONS,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() openedChange = new EventEmitter<boolean>();

  @ViewChild('input', { static: true, read: ElementRef }) input: ElementRef;

  pesquisa = new FormControl();
  subs = new Subscription();
  searchVisible = false;

  constructor(private stateService: DataViewService) {}

  ngOnInit(): void {
    const search = this.pesquisa.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => this.stateService.changeSearch(value));
    this.subs.add(search);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  toggle() {
    this.searchVisible = !this.searchVisible;
    if (this.searchVisible) this.input.nativeElement.focus();
    this.openedChange.emit(this.searchVisible);
  }

  clear() {
    this.searchVisible = false;
    this.pesquisa.setValue(null, { emitEvent: false });
    this.stateService.changeSearch(null);
    this.openedChange.emit(false);
  }
}
