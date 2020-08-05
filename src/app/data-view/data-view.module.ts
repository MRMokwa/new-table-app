import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DataViewComponent } from './data-view.component';
import { TableDirective } from './table.directive';
import { FilterDirective } from './filter.directive';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [DataViewComponent, TableDirective, FilterDirective, SearchComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  exports: [DataViewComponent],
})
export class DataViewModule {}
