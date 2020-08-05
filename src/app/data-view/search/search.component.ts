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
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => this.stateService.changeSearch(value));
    this.subs.add(search);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  open() {
    this.searchVisible = true;
    this.openedChange.emit(true);
    this.input.nativeElement.focus();
  }

  close() {
    this.searchVisible = false;
    this.openedChange.emit(false);
    this.pesquisa.setValue(null, { emitEvent: false });
    this.stateService.changeSearch(null);
  }

  clear() {
    if (!this.searchVisible) return;
    this.pesquisa.setValue(null, { emitEvent: false });
    this.stateService.changeSearch(null);
  }
}
