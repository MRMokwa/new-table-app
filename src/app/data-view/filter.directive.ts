import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFilter]',
})
export class FilterDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
