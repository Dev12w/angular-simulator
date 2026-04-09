import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { Message } from "../../enums/Message";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private messagesSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
  messages$: Observable<IMessage[]> = this.messagesSubject.asObservable();

  private addMessage(message: IMessage): void {
    this.messagesSubject.next([message, ...this.messagesSubject.getValue()]);
    setTimeout(() => this.closeMessage(message), 5000);
  }

  closeMessage(message: IMessage): void {
    const messages: IMessage[] = this.messagesSubject.getValue()
      .filter((currentMessage: IMessage) => currentMessage !== message);
    this.messagesSubject.next(messages);
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
