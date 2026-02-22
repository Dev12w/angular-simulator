import { MessageType } from '../../enums/message-type';

export interface IMessage {
  type: MessageType;
  content: string;
}
