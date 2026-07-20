import { Component, inject } from '@angular/core';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { MessageService } from '../../app/services/message.service';
import { FaIconComponent, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faMessage, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-message',
  imports: [NgTemplateOutlet, AsyncPipe, FaIconComponent],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

  messageService: MessageService = inject(MessageService);

  messageIcon: IconDefinition = faMessage;
  circleXmark: IconDefinition = faCircleXmark;

}
