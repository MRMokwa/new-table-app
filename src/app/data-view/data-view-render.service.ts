import {
  Injectable,
  Type,
  ViewContainerRef,
  ComponentFactoryResolver,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataViewRenderService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  create(component: Type<any>, viewContainerRef: ViewContainerRef) {
    viewContainerRef.clear();
    if (!component) return;
    viewContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(component)
    );
  }
}
