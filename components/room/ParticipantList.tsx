import { IParticipantList } from "@/types/participants.type";
import { ScrollArea } from "@/components/ui/scroll-area";
import dynamic from "next/dynamic";

const Participant = dynamic(() => import("./Participant"));

export default function ParticipantList({ participants }: IParticipantList) {
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
}
