import { Injectable, EventEmitter, Type } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { FloaterService } from '../core/floater/floater.service';
import { NgNotificationData, NgNotificationDataFilled } from './notification.definition';
import { NgMessageBaseService } from '../message/message.service';
import { NgMessageDataOptions } from '../message/message.definition';
import { NgNotificationContainerComponent } from './notification-container.component';

@Injectable()
export class NgNotificationService extends NgMessageBaseService<NgNotificationContainerComponent, NgNotificationData> {

  constructor(floaterService: FloaterService) {
    super(floaterService, NgNotificationContainerComponent, 'notification-');
  }

  // Shortcut methods
  success(title: string, content: string, options?: NgMessageDataOptions): NgNotificationDataFilled {
    return this.createMessage({ type: 'success', title: title, content: content }, options);
  }

  error(title: string, content: string, options?: NgMessageDataOptions): NgNotificationDataFilled {
    return this.createMessage({ type: 'error', title: title, content: content }, options);
  }

  info(title: string, content: string, options?: NgMessageDataOptions): NgNotificationDataFilled {
    return this.createMessage({ type: 'info', title: title, content: content }, options);
  }

  warning(title: string, content: string, options?: NgMessageDataOptions): NgNotificationDataFilled {
    return this.createMessage({ type: 'warning', title: title, content: content }, options);
  }

  blank(title: string, content: string, options?: NgMessageDataOptions): NgNotificationDataFilled {
    return this.createMessage({ type: 'blank', title: title, content: content }, options);
  }

  confirm(type: string = 'info', params: NgNotificationData, options?: NgMessageDataOptions): NgNotificationDataFilled {
    const param = Object.assign({ type: type }, { confirm: true }, params);
    return this.createMessage(param, options);
  }

  create(type: string, title: string, content: string, options?: NgMessageDataOptions): NgNotificationDataFilled {
    return this.createMessage({ type: type as any, title: title, content: content }, options);
  }

  // For content with html
  html(html: string|SafeHtml, options?: NgMessageDataOptions): NgNotificationDataFilled {
    return this.createMessage({ html: html, type: 'html' }, options);
  }
}
