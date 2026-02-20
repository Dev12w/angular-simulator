import { MessageType } from '../../enums/MessageType';

export interface IMessage {
  type: MessageType;
  content: string;
}
