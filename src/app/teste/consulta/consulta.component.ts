import { Component, OnInit } from '@angular/core';

import { TabelaComponent } from '../tabela/tabela.component';
import { FiltroComponent } from '../filtro/filtro.component';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss'],
})
export class ConsultaComponent implements OnInit {
  table = TabelaComponent;
  filter = FiltroComponent;

  constructor() {}

  ngOnInit() {}
}
