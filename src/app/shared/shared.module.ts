import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module';

@NgModule({
  imports: [CommonModule],
  exports: [MaterialModule, FlexLayoutModule, LayoutModule],
})
export class SharedModule {}
