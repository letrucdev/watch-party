"use client";

import { routePath } from "@constants/path";
import { partyApi } from "@lib/apis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    IPartyParticipant,
    IPartyPlaylist,
    IPlaylistVideo,
} from "@type/api.type";
import { useRouter } from "next/navigation";
import {
    Dispatch,
    SetStateAction,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

interface IRoomContext {
    partyId: string | null;
    partyOwnerId: number | undefined;
    setPartyId: Dispatch<SetStateAction<string | null>>;
    participants: IPartyParticipant[] | undefined;
    playlist: IPartyPlaylist[] | undefined;
    chat: [];
    setChat: Dispatch<SetStateAction<[]>>;
    createRoom: (video: IPlaylistVideo) => Promise<void>;
    exitRoom: () => void;
    addVideoToPlaylist: (
        video: IPlaylistVideo,
        partyId: string
    ) => Promise<void>;
    isPending: boolean;
}

const RoomContext = createContext<IRoomContext>({
    partyId: null,
    partyOwnerId: undefined,
    setPartyId: () => {},
    participants: undefined,
    playlist: undefined,
    chat: [],
    setChat: () => {},
    createRoom: async () => {},
    exitRoom: () => {},
    addVideoToPlaylist: async () => {},
    isPending: false,
});

export const RoomProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const [partyId, setPartyId] = useState<string | null>(null);
    const [chat, setChat] = useState<[]>([]);

    const createRoomMutation = useMutation({
        mutationFn: partyApi.Create,
        onSuccess: (data) => {
            router.push(`${routePath.party}/${data.partyId}`);
        },
    });

    const addVideoToPlaylistMutation = useMutation({
        mutationFn: ({
            video,
            partyId,
        }: {
            video: IPlaylistVideo;
            partyId: string;
        }) => partyApi.AddVideoToPlaylist(partyId, video),
    });

    const exitRoomMutation = useMutation({
        mutationFn: (partyId: string) => partyApi.ExitRoom(partyId),
        onSuccess: () => {
            setPartyId(null);
            queryClient.removeQueries({ queryKey: ["room"] });
            router.push(routePath.home);
        },
    });

    const joinRoomQuery = useQuery({
        queryKey: ["room", partyId],
        queryFn: () => partyApi.Join(partyId as string),
        enabled: Boolean(partyId),
    });

    const addVideoToPlaylist = useCallback(
        async (video: IPlaylistVideo, partyId: string) => {
            try {
                await addVideoToPlaylistMutation.mutateAsync({
                    video,
                    partyId,
                });
            } catch (error) {
                throw error;
            }
        },
        [addVideoToPlaylistMutation]
    );

    const createRoom = async (video: IPlaylistVideo) => {
        try {
            await createRoomMutation.mutateAsync(video);
        } catch (error) {
            throw error;
        }
    };

    const exitRoom = useCallback(
        () => exitRoomMutation.mutate(partyId!),
        [exitRoomMutation, partyId]
    );

    const isPending = joinRoomQuery.isPending;
    const participants = joinRoomQuery.data?.party.partyParticipants;
    const playlist = joinRoomQuery.data?.party.partyPlaylist;
    const partyOwnerId = joinRoomQuery.data?.party.ownerId;

    return (
        <RoomContext.Provider
            value={{
                setPartyId,
                partyId,
                partyOwnerId,
                participants,
                playlist,
                chat,
                setChat,
                createRoom,
                exitRoom,
                addVideoToPlaylist,
                isPending,
            }}
        >
            {children}
        </RoomContext.Provider>
    );
};

export const useRoomContext = () => {
    const context = useContext(RoomContext);
    if (!context) {
        throw new Error("useRoom must be used inside the RoomProvider");
    }
    return context;
};
