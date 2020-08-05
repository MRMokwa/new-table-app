import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TabelaComponent } from './tabela/tabela.component';
import { SharedModule } from './../shared/shared.module';
import { FiltroComponent } from './filtro/filtro.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { DataViewModule } from 'src/app/data-view/data-view.module';

@NgModule({
  declarations: [TabelaComponent, FiltroComponent, ConsultaComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, DataViewModule],
  exports: [ConsultaComponent],
})
export class TesteModule {}
