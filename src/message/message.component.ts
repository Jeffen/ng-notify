import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgMessageDataFilled, NgMessageDataOptions } from '../message/message.definition';
import { NgMessageContainerComponent } from '../message/message-container.component';
import { NgMessageConfig } from '../message/message.config';

@Component({
  selector: 'ng-message',
  styleUrls: ['./message.component.scss'],
  animations: [
    trigger('enterLeave', [
      state('enter', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('* => enter', [style({ opacity: 0, transform: 'translateY(-50%)' }), animate('100ms linear')]),
      state('leave', style({ opacity: 0, transform: 'translateY(-50%)' })),
      transition('* => leave', [style({ opacity: 1, transform: 'translateY(0)' }), animate('100ms linear')])
    ])
  ],
  template: `
    <div class="ng-message-notice"
      [@enterLeave]="ngMessage.state"
      (mouseenter)="onEnter()"
      (mouseleave)="onLeave()">
      <div class="ng-message-notice-content" [ngClass]="'ng-message-content-' + ngMessage.type">
        <div *ngIf="!ngMessage.html" class="ng-message-custom-content" [ngClass]="'ng-message-' + ngMessage.type">
          <ng-container [ngSwitch]="ngMessage.type">
            <i *ngSwitchCase="'success'" class="ui icon check circle"></i>
            <i *ngSwitchCase="'info'" class="ui icon info circle"></i>
            <i *ngSwitchCase="'warning'" class="ui icon warning circle"></i>
            <i *ngSwitchCase="'error'" class="ui icon remove circle"></i>
            <i *ngSwitchCase="'loading'" class="ui icon spinner"></i>
          </ng-container>
          <span>{{ngMessage.content}}</span>
        </div>
        <div *ngIf="ngMessage.html" [innerHTML]="ngMessage.html"></div>
      </div>
    </div>
  `
})
export class NgMessageComponent implements OnInit, OnDestroy {
  @Input()
  ngMessage: NgMessageDataFilled;
  @Input()
  ngIndex: number;

  protected _options: NgMessageDataOptions; // Shortcut reference to ngMessage.options

  // For auto erasing(destroy) self
  private _autoErase: boolean; // Whether record timeout to auto destroy self
  private _eraseTimer: number = null;
  private _eraseTimingStart: number;
  private _eraseTTL: number; // Time to live

  constructor(private _messageContainer: NgMessageContainerComponent<NgMessageConfig>) {}

  ngOnInit() {
    this._options = this.ngMessage.options;
    if (this._options.animate) {
      this.ngMessage.state = 'enter';
    }

    this._autoErase = this._options.duration > 0;
    if (this._autoErase) {
      this._initErase();
      this._startEraseTimeout();
    }
  }

  ngOnDestroy() {
    if (this._autoErase) {
      this._clearEraseTimeout();
    }
  }

  onEnter() {
    if (this._autoErase && this._options.pauseOnHover) {
      this._clearEraseTimeout();
      this._updateTTL();
    }
  }

  onLeave() {
    if (this._autoErase && this._options.pauseOnHover) {
      this._startEraseTimeout();
    }
  }

  // Remove self
  protected _destroy() {
    if (this._options.animate) {
      this.ngMessage.state = 'leave';
      setTimeout(() => this._messageContainer.removeMessage(this.ngMessage.messageId), 200);
    } else {
      this._messageContainer.removeMessage(this.ngMessage.messageId);
    }
  }

  private _initErase() {
    this._eraseTTL = this._options.duration;
    this._eraseTimingStart = Date.now();
  }

  private _updateTTL() {
    if (this._autoErase) {
      this._eraseTTL -= Date.now() - this._eraseTimingStart;
    }
  }

  private _startEraseTimeout() {
    if (this._eraseTTL > 0) {
      this._clearEraseTimeout(); // To prevent calling _startEraseTimeout() more times to create more timer
      this._eraseTimer = window.setTimeout(() => this._destroy(), this._eraseTTL);
      this._eraseTimingStart = Date.now();
    } else {
      this._destroy();
    }
  }

  private _clearEraseTimeout() {
    if (this._eraseTimer !== null) {
      window.clearTimeout(this._eraseTimer);
      this._eraseTimer = null;
    }
  }
}
