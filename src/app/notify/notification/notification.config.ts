import { InjectionToken } from '@angular/core';
import { NgMessageConfig } from '../message/message.config';

export class NgNotificationConfig extends NgMessageConfig {
  top?: string;
  right?: string;
}

export const NG_NOTIFICATION_DEFAULT_CONFIG = new InjectionToken<NgNotificationConfig>('NOTIFICATION_DEFAULT_CONFIG');

export const NG_NOTIFICATION_CONFIG = new InjectionToken<NgNotificationConfig>('NOTIFICATION_CONFIG');

export const NG_NOTIFICATION_DEFAULT_CONFIG_PROVIDER = {
  provide: NG_NOTIFICATION_DEFAULT_CONFIG,
  useValue: {
    top                  : '24px',
    right                : '0px',
    duration             : 4500, // 4500
    maxStack             : 7,
    pauseOnHover         : true,
    animate              : true
  }
};
