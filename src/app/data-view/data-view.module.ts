import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataViewComponent } from './data-view.component';
import { TableDirective } from './table.directive';
import { FilterDirective } from './filter.directive';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DataViewComponent, TableDirective, FilterDirective],
  imports: [CommonModule, SharedModule],
  exports: [DataViewComponent],
})
export class DataViewModule {}
