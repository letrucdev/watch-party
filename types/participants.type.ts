export interface IParticipant {
  id: number;
  avatarSrc: string;
  username: string;
}

export interface IParticipantList {
  participants: IParticipant[];
}
