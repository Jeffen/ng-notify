import { SafeHtml } from '@angular/platform-browser';
export interface NgMessageDataOptions {
  duration?: number;
  animate?: boolean;
  pauseOnHover?: boolean;
}

// Message data for terminal users
export interface NgMessageData {
  // For html
  html?: string | SafeHtml;

  // For string content
  type?: 'success' | 'info' | 'warning' | 'error' | 'loading' | 'html' | any;
  content?: string;
  title?: string;
}

// Filled version of messageData (includes more private properties)
export interface NgMessageDataFilled extends NgMessageData {
  messageId: string; // Service-wide unique id, auto generated
  state?: 'enter' | 'leave';
  options?: NgMessageDataOptions;
  createdAt: Date;
}
