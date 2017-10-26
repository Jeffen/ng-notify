import { NgModule } from '@angular/core';
import { NG_NOTIFICATION_DEFAULT_CONFIG_PROVIDER } from './notification.config';
import { NgNotificationContainerComponent } from './notification-container.component';
import { NgNotificationComponent } from './notification.component';
import { CommonModule } from '@angular/common';
import { FloaterModule } from '../core/floater/index';

@NgModule({
  imports: [CommonModule, FloaterModule],
  declarations: [NgNotificationComponent, NgNotificationContainerComponent],
  providers: [
    NG_NOTIFICATION_DEFAULT_CONFIG_PROVIDER
  ],
  entryComponents: [NgNotificationContainerComponent],
})
export class NgNotificationModule {}
