import {
  Injectable,
  Inject,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef
 } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ComponentType } from '@angular/cdk/portal';

/** Next overlay unique ID. */
let nextUniqueId = 0;

@Injectable()
export class FloaterService {

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _resolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    private _injector: Injector
  ) {
    console.log('[FloaterService] constructed once.');
  }

  private _createWrapperContainer(): HTMLElement {
    let container = this._document.getElementById(`ng-overlay-container-${nextUniqueId}`);
    if (!container) {
      container = this._document.createElement('div');
      container.classList.add('ng-overlay-wrapper');
      container.id = `ng-overlay-container-${nextUniqueId++}`;
      this._document.body.appendChild(container);
    }
    return container;
  }

  public appendComponentToBody(component: ComponentType<any>) {
    // 1. create a component reference from the component
    const componentRef = this._resolver
      .resolveComponentFactory(component)
      .create(this._injector);

    // 2. Attach component to the appRef so that it's inside the component tree
    this._appRef.attachView(componentRef.hostView);

    // 3. Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // 4. Append DOM element to the body
    document.body.appendChild(this._createWrapperContainer()).appendChild(domElem);
    return componentRef.instance;
  }
}
