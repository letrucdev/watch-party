import { ScrollArea } from "@/components/ui/scroll-area";
import { ParticipantSkeleton } from "@/components/participant/ParticipantSkeleton";

import dynamic from "next/dynamic";
import { useRoomContext } from "@/context/RoomContext";

const Participant = dynamic(() => import("./Participant"), {
    loading: () => <ParticipantSkeleton />,
});

export default function ParticipantList() {
    const { participants, partyOwnerId } = useRoomContext();
    return (
        <ScrollArea className="flex flex-col mt-1 flex-grow">
            {participants?.map(({ user }) => {
                return (
                    <Participant
                        key={user.id}
                        id={user.id}
                        isOwner={user.id === partyOwnerId}
                        avatarSrc={user.avatar}
                        username={user.displayName}
                    />
                );
            })}
        </ScrollArea>
    );
}
