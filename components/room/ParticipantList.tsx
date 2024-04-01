import { ScrollArea } from "../ui/scroll-area";
import { IParticipant, Participant } from "./Participant";

interface IParticipantList {
  participants: IParticipant[];
}

export const ParticipantList = ({ participants }: IParticipantList) => {
  return (
    <ScrollArea className="flex flex-col mt-1">
      {participants.map((participant) => {
        return (
          <Participant
            key={participant.id}
            id={participant.id}
            avatarSrc={participant.avatarSrc}
            username={participant.username}
          />
        );
      })}
    </ScrollArea>
  );
};
