import { Optional, Inject, Component, ViewEncapsulation } from '@angular/core';
import { NG_NOTIFICATION_DEFAULT_CONFIG, NG_NOTIFICATION_CONFIG, NgNotificationConfig } from './notification.config';
import { NgMessageContainerComponent } from '../message/message-container.component';

@Component({
  selector     : 'ng-notification-container',
  template     : `
    <div class="ng-notification" [style.top]="config.top" [style.right]="config.right">
      <ng-notification *ngFor="let message of messages; let i = index" [ngMessage]="message" [ngIndex]="i"></ng-notification>
    </div>
  `,
  styleUrls    : [
    './notification.component.scss'
  ]
})
export class NgNotificationContainerComponent extends NgMessageContainerComponent<NgNotificationConfig> {

  constructor(@Optional() @Inject(NG_NOTIFICATION_DEFAULT_CONFIG) defaultConfig: NgNotificationConfig,
              @Optional() @Inject(NG_NOTIFICATION_CONFIG) config: NgNotificationConfig) {
    super(defaultConfig, config);
  }
}
