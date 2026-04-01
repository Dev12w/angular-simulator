import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { Message } from "../../enums/Message";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private messagesSabject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
  readonly messages$ = this.messagesSabject.asObservable();

  private addMessage(message: IMessage): void {
    this.messagesSabject.next([message, ...this.messagesSabject.value]);

    setTimeout(() => this.closeMessage(message), 5000);
  }

  closeMessage(message: IMessage): void {
    const filtered = this.messagesSabject.value.filter((currentMessage: IMessage) => currentMessage !== message);
    this.messagesSabject.next(filtered);
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
