import { Component, ViewEncapsulation } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { NgMessageComponent } from '../message/message.component';
import { NgNotificationContainerComponent } from './notification-container.component';

@Component({
  selector     : 'ng-notification',
  encapsulation: ViewEncapsulation.None,
  animations   : [
    trigger('enterLeave', [
      state('enter', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('* => enter', [
        style({ opacity: 0, transform: 'translateX(5%)' }),
        animate('100ms linear')
      ]),
      state('leave', style({ opacity: 0, transform: 'translateY(-10%)' })),
      transition('* => leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('100ms linear')
      ]),
    ])
  ],
  template     : `
    <div class="ng-notification-notice ng-notification-notice-closable"
      [ngClass]="ngMessage.type"
      [@enterLeave]="ngMessage.state"
      (mouseenter)="onEnter()"
      (mouseleave)="onLeave()">
      <div *ngIf="!ngMessage.html" class="ng-notification-notice-content">
        <div class="ng-notification-notice-content" [ngClass]="{ 'ng-notification-notice-with-icon': ngMessage.type !== 'blank' }">
          <ng-container [ngSwitch]="ngMessage.type">
            <i *ngSwitchCase="'success'" class="ng-notification-notice-icon ng-notification-notice-icon-success ui icon checkmark"></i>
            <i *ngSwitchCase="'info'" class="ng-notification-notice-icon ng-notification-notice-icon-info ui icon info"></i>
            <i *ngSwitchCase="'warning'" class="ng-notification-notice-icon ng-notification-notice-icon-warning ui icon warning"></i>
            <i *ngSwitchCase="'error'" class="ng-notification-notice-icon ng-notification-notice-icon-error ui icon remove"></i>
          </ng-container>
          <div class="ng-notification-notice-message">{{ngMessage.title}}</div>
          <div class="ng-notification-notice-description">{{ngMessage.content}}</div>
          </div>
      </div>
      <div *ngIf="ngMessage.html" [innerHTML]="ngMessage.html"></div>
      <a tabindex="0" class="ng-notification-notice-close" (click)="onClickClose()">
        <span class="ng-notification-notice-close-x"></span>
      </a>
    </div>
  `,
  styleUrls    : [
    './notification.component.scss'
  ]
})
export class NgNotificationComponent extends NgMessageComponent {
  constructor(container: NgNotificationContainerComponent) {
    super(container);
  }

  onClickClose() {
    this._destroy();
  }

  onClickOk(okFunc: Function) {
    if (okFunc instanceof Function) {
      const result = okFunc();
      console.log(result);
      if (result === false) {
        return;
      } else if (result === true) {
        this._destroy();
      }
    }
  }

  onClickDeny(denyFunc: Function) {
    if (denyFunc instanceof Function) {
      const result = denyFunc();
      if (result === false) {
        return;
      } else if (result === true) {
        this._destroy();
      }
    }
  }
}
