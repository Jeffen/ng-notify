import { NgMessageData, NgMessageDataOptions } from '../message/message.definition';

export interface NgNotificationData extends NgMessageData {
  // Overrides for string content
  type?: 'success' | 'info' | 'warning' | 'error' | 'blank' | 'html';
  title?: string;
  confirm?: boolean;
  closable?: boolean;
  okText?: string;
  denyText?: string;
  okFunc?: Function;
  denyFunc?: Function;
}

// Filled version of NzMessageData (includes more private properties)
export interface NgNotificationDataFilled extends NgNotificationData {
  messageId: string; // Service-wide unique id, auto generated
  state?: 'enter' | 'leave';
  options?: NgMessageDataOptions;
  createdAt: Date; // Auto created
}
