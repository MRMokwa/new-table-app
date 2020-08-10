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
      this.handleFormValues(filtro)
    );

    this.subscription.add(filterChange);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleFormValues(values: any) {
    const filter: any = {};

    if (values.idadeMax != 60) {
      filter.idadeMax = values.idadeMax;
    }

    this.dataViewState.changeFilter(Object.keys(filter).length ? filter : null);
  }
}
