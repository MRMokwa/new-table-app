import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appTable]',
})
export class TableDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
