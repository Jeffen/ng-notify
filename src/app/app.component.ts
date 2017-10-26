import { Component } from '@angular/core';
import { NgMessageService } from './notify/message/message.service';
import { NgNotificationService } from './notify/notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  type = ['success', 'info', 'warning', 'error', 'loading'];
  content = `
  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type
  specimen book.
  `;
  constructor(
    private messageService: NgMessageService,
    private notifyService: NgNotificationService
  ) {}

  sendMsg() {
    const num = Math.floor(Math.random() * 5);
    this.messageService.create(this.type[num], 'This is a successful message!!');
    this.notifyService.create(this.type[num], 'This is a title', this.content);
  }
}
