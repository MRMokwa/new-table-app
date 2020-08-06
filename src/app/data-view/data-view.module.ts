import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DataViewComponent } from './data-view.component';
import { TableDirective } from './table.directive';
import { FilterDirective } from './filter/filter.directive';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search/search.component';
import { FilterComponent } from './filter/filter.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    DataViewComponent,
    TableDirective,
    FilterDirective,
    SearchComponent,
    FilterComponent,
    ToolbarComponent,
  ],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  exports: [DataViewComponent],
})
export class DataViewModule {}
