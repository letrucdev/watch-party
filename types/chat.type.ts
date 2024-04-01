import { IParticipant } from "./participants.type";

export interface IChatItem {
  content: string;
  sender: IParticipant;
}
