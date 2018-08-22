import { Injectable, ComponentRef, Type, ViewContainerRef } from '@angular/core';
import { FloaterService } from '../core/floater/floater.service';
import { NgMessageConfig } from '../message/message.config';
import { NgMessageData, NgMessageDataFilled, NgMessageDataOptions } from '../message/message.definition';
import { NgMessageContainerComponent } from '../message/message-container.component';

export class NgMessageBaseService<ContainerClass extends NgMessageContainerComponent<NgMessageConfig>, MessageData> {
  protected _counter = 0; // Id counter for messages
  protected _container: ContainerClass;

  constructor(floaterService: FloaterService, containerClass: Type<ContainerClass>, private _idPrefix: string = '') {
    this._container = floaterService.appendComponentToBody(containerClass);
  }

  remove(messageId?: string): void {
    if (messageId) {
      this._container.removeMessage(messageId);
    } else {
      this._container.removeMessageAll();
    }
  }

  createMessage(message: NgMessageData, options?: NgMessageDataOptions): NgMessageDataFilled {
    const resultMessage: NgMessageDataFilled = Object.assign(message, {
      messageId: this.generateMessageId(),
      options: options,
      createdAt: new Date()
    });
    this._container.createMessage(resultMessage);

    return resultMessage;
  }

  protected generateMessageId(): string {
    return this._idPrefix + this._counter++;
  }
}

@Injectable()
export class NgMessageService extends NgMessageBaseService<
  NgMessageContainerComponent<NgMessageConfig>,
  NgMessageData
> {
  constructor(floaterService: FloaterService) {
    super(floaterService, NgMessageContainerComponent, 'message-');
  }

  // Shortcut methods
  success(content: string, options?: NgMessageDataOptions) {
    return this.createMessage({ type: 'success', content: content }, options);
  }

  error(content: string, options?: NgMessageDataOptions) {
    return this.createMessage({ type: 'error', content: content }, options);
  }

  info(content: string, options?: NgMessageDataOptions) {
    return this.createMessage({ type: 'info', content: content }, options);
  }

  warning(content: string, options?: NgMessageDataOptions) {
    return this.createMessage({ type: 'warning', content: content }, options);
  }

  loading(content: string, options?: NgMessageDataOptions) {
    return this.createMessage({ type: 'loading', content: content }, options);
  }

  create(type: string, content: string, options?: NgMessageDataOptions) {
    return this.createMessage({ type: type as any, content: content }, options);
  }

  // For content with html
  html(html: string, options?: NgMessageDataOptions) {
    return this.createMessage({ html: html }, options);
  }
}
