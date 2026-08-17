import { Injectable, inject } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { Message } from '../../enums/Message';
import { BehaviorSubject, Observable } from 'rxjs';
import { APP_CONFIG } from '../tokens/app-config.token';
import { IAppConfig } from '../interfaces/IAppConfig';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private config: IAppConfig = inject(APP_CONFIG);

  private messagesSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
  messages$: Observable<IMessage[]> = this.messagesSubject.asObservable();

  private addMessage(message: IMessage): void {
    if (!this.config.enableNotifications) return;

    this.messagesSubject.next([message, ...this.messagesSubject.getValue()]);
    setTimeout(() => this.closeMessage(message), 5000);
  }

  closeMessage(message: IMessage): void {
    const messages: IMessage[] = this.messagesSubject.getValue().filter((currentMessage: IMessage) => currentMessage !== message);
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
