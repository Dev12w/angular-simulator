import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { Message } from "../../enums/Message";

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  messages: IMessage[] = [];

  private addMessage(message: IMessage): void {
    this.messages = [message, ...this.messages];

    setTimeout(() => this.closeMessage(message), 5000);
  }

  closeMessage(message: IMessage): void {
    this.messages = this.messages.filter((currentMessage: IMessage) => currentMessage !== message);
  }

  showWarn(content: string): void {
    this.addMessage({ type: Message.WARNING, content });
  }

  showError(content: string): void {
    this.addMessage({ type: Message.ERROR, content });
  }

  showSuccess(content: string): void {
    this.addMessage({ type: Message.SUCCESS, content });
  }

  showInfo(content: string): void {
    this.addMessage({ type: Message.INFO, content });
  }

}
