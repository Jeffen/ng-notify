import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMessageComponent } from '../message/message.component';
import { NgMessageContainerComponent } from '../message/message-container.component';
import { NG_MESSAGE_DEFAULT_CONFIG_PROVIDER } from '../message/message.config';
import { FloaterModule } from '../core/floater';

@NgModule({
  imports: [CommonModule, FloaterModule],
  declarations: [NgMessageContainerComponent, NgMessageComponent],
  providers: [NG_MESSAGE_DEFAULT_CONFIG_PROVIDER],
  entryComponents: [NgMessageContainerComponent],
  exports: [NgMessageContainerComponent]
})
export class NgMessageModule {}
