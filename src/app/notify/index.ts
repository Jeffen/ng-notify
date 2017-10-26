// ---------------------------------------------------------
// | Imports
// ---------------------------------------------------------

// Angular
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { NgMessageModule } from './message/message.module';
import { NgNotificationModule } from './notification/notification.module';

// Services
import { NgMessageService } from './message/message.service';
import { NgNotificationService } from './notification/notification.service';

// Components
import { NgMessageContainerComponent } from './message/message-container.component';
import { NgMessageComponent } from './message/message.component';
import { NgNotificationContainerComponent } from './notification/notification-container.component';
import { NgNotificationComponent } from './notification/notification.component';

// ---------------------------------------------------------
// | Exports
// ---------------------------------------------------------
export { NgMessageService } from './message/message.service';
export { NgNotificationService } from './notification/notification.service';

// ---------------------------------------------------------
// | Root module
// ---------------------------------------------------------
@NgModule({
  exports: [
    NgMessageModule,
    NgNotificationModule
  ]
})
export class NgNotifyModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgNotifyModule,
      providers: [
        // Services
        NgMessageService,
        NgNotificationService
      ]
    };
  }
}
