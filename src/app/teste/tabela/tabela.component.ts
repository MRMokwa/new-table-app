import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';

import { Observable } from 'rxjs';

import { TesteService } from '../teste.service';
import { DataViewStateService } from 'src/app/data-view/data-view-state.service';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabelaComponent implements OnInit {
  data$: Observable<Person[]>;
  columns = ['id', 'first', 'last', 'age', 'company', 'email'];

  constructor(
    private testeService: TesteService,
    private dataViewStateService: DataViewStateService
  ) {}

  ngOnInit() {
    this.data$ = this.dataViewStateService.getData((params: Parametros) =>
      this.testeService.getAll(params)
    );
  }

  sortData(sort: Sort) {
    this.dataViewStateService.changeSort(sort as Ordenacao);
  }

  setColor(idade: number) {
    const min = 20;
    const max = 45;
    idade = idade < min ? min : idade > max ? max : idade;
    const value = ((idade - min) * 100) / (max - min) / 100;
    const hue = ((1 - value) * 120).toString(10);
    return ['hsl(', hue, ', 100%, 50%)'].join('');
  }
}
