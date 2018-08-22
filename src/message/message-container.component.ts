import { Component, OnInit, Optional, Inject } from '@angular/core';
import { NgMessageDataFilled, NgMessageDataOptions } from './message.definition';
import { NgMessageConfig, NG_MESSAGE_CONFIG, NG_MESSAGE_DEFAULT_CONFIG } from './message.config';

@Component({
  selector : 'ng-message-container',
  styleUrls: ['./message.component.scss'],
  template : `
  <div class="ng-message">
    <ng-message *ngFor="let message of messages; let i = index" [ngMessage]="message" [ngIndex]="i"></ng-message>
  </div>
  `,
})
export class NgMessageContainerComponent<Config extends NgMessageConfig> implements OnInit {
  messages: NgMessageDataFilled[] = [];
  config: NgMessageConfig;

  constructor(
    @Optional() @Inject(NG_MESSAGE_DEFAULT_CONFIG) defaultConfig: NgMessageConfig,
    @Optional() @Inject(NG_MESSAGE_CONFIG) config: Config
  ) {
      this.config = Object.assign({}, defaultConfig, config) as Config;
    }

  ngOnInit() { }

  // Create a new message
  createMessage(message: NgMessageDataFilled): void {
    if (this.messages.length >= this.config.maxStack) {
      this.messages.splice(0, 1);
    }
    message.options = this.mergeMessageOptions(message.options);
    this.messages.push(message);
  }

  // Remove a message by messageId
  removeMessage(messageId: string): void {
    this.messages.some((message, index) => {
      if (message.messageId === messageId) {
        this.messages.splice(index, 1);
        return true;
      }
    });
  }

  // Remove all messages
  removeMessageAll() {
    this.messages = [];
  }

  // Merge default options and cutom message options
  protected mergeMessageOptions(options: NgMessageDataOptions): NgMessageDataOptions {
    const defaultOptions: NgMessageDataOptions = {
      duration: this.config.duration,
      animate: this.config.animate,
      pauseOnHover: this.config.pauseOnHover
    };
    return Object.assign(defaultOptions, options);
  }
}
