import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { DataViewService } from 'src/app/data-view/data-view.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss'],
})
export class FiltroComponent implements OnInit, OnDestroy {
  form: FormGroup;
  idadeMax: FormControl;
  subscription = new Subscription();

  constructor(private dataViewState: DataViewService) {}

  ngOnInit(): void {
    this.idadeMax = new FormControl(60);

    this.form = new FormGroup({
      idadeMax: this.idadeMax,
    });

    const filterChange = this.form.valueChanges.subscribe((filtro) =>
      this.dataViewState.changeFilter(filtro)
    );

    this.subscription.add(filterChange);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
