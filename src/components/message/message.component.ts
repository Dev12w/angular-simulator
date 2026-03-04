import { Component, inject } from '@angular/core';
import { Message } from "../../enums/Message";
import { NgTemplateOutlet } from "@angular/common";
import { MessageService } from "../../app/services/message.service";

@Component({
  selector: 'app-message',
  imports: [ NgTemplateOutlet ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

  messageService: MessageService = inject(MessageService);

}
