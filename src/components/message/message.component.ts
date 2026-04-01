import { Component, inject } from '@angular/core';
import { AsyncPipe, NgTemplateOutlet } from "@angular/common";
import { MessageService } from "../../app/services/message.service";

@Component({
  selector: 'app-message',
  imports: [ NgTemplateOutlet, AsyncPipe ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

  messageService: MessageService = inject(MessageService);
  
}
