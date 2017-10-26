import { InjectionToken } from '@angular/core';

export class NgMessageConfig {
  duration?: number;
  pauseOnHover?: boolean;
  animate?: boolean;
  maxStack?: number;
}

export const NG_MESSAGE_DEFAULT_CONFIG = new InjectionToken<NgMessageConfig>('MESSAGE_DEFAULT_CONFIG');

export const NG_MESSAGE_CONFIG = new InjectionToken<NgMessageConfig>('MESSAGE_CONFIG');

export const NG_MESSAGE_DEFAULT_CONFIG_PROVIDER = {
  provide: NG_MESSAGE_DEFAULT_CONFIG,
  useValue: {
    duration             : 2500, // default: 1500
    animate              : true,
    pauseOnHover         : true,
    maxStack             : 7,
  }
};
