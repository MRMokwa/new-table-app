import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DataViewComponent } from './data-view.component';
import { TableDirective } from './table/table.directive';
import { FilterDirective } from './filter/filter.directive';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search/search.component';
import { FilterComponent } from './filter/filter.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TableComponent } from './table/table.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { FilterButtonsComponent } from './filter-buttons/filter-buttons.component';

@NgModule({
  declarations: [
    DataViewComponent,
    TableDirective,
    FilterDirective,
    SearchComponent,
    FilterComponent,
    ToolbarComponent,
    TableComponent,
    PaginatorComponent,
    FilterButtonsComponent,
  ],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  exports: [DataViewComponent, FilterButtonsComponent],
})
export class DataViewModule {}
