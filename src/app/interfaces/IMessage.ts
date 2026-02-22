import { MessageType } from '../../enums/Message-type';

export interface IMessage {
  type: MessageType;
  content: string;
}
