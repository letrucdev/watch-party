import { z } from "zod";
import { IUser, IUserSetting } from "./user.type";
import { UpdateUserInfoSchema } from "@api/schema/User";

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface IRegisterRequest {
    email: string;
    password: string;
    confirmPassword: string;
    displayName: string;
}

export interface IUpdateUserInfoRequest
    extends Omit<z.infer<typeof UpdateUserInfoSchema>, "avatar"> {
    avatar?: string;
}

export interface FormErrorResponse {
    [key: string]: string[];
}

export interface SuccessResponse {
    message: string;
}

export interface IPlaylistVideo {
    videoId: string;
    thumbnail: string;
    videoTitle: string;
    channelTitle: string;
}

export interface IPartyPlaylist {
    video: IPlaylistVideo;
}

export interface IPartyParticipant {
    user: Pick<IUser, "id" | "displayName" | "avatar">;
}

export interface IJoinPartyResponse extends SuccessResponse {
    party: IGetPartyResponse;
}

export interface ICreatePartyResponse extends SuccessResponse {
    partyId: string;
}

export interface IGetPartyResponse {
    id: number;
    ownerId: number;
    partyId: string;
    partyParticipants: IPartyParticipant[];
    partyPlaylist: IPartyPlaylist[];
}

export interface IAddVideoToPlaylistResponse extends SuccessResponse {
    video: IPlaylistVideo;
}

export interface ILoginResponse extends SuccessResponse {
    user: IUser;
}

export interface IUploadAvatarResponse extends SuccessResponse {
    avatar: string;
}

export interface IChangeSettingResponse extends SuccessResponse {
    setting: IUserSetting;
}

export interface IYoutubeVideoThumbnailDetail {
    url: string;
    width: number;
    height: number;
}

export interface IYoutubeVideoThumbnails {
    default: IYoutubeVideoThumbnailDetail;
    medium: IYoutubeVideoThumbnailDetail;
    high: IYoutubeVideoThumbnailDetail;
    standard?: IYoutubeVideoThumbnailDetail;
    maxres?: IYoutubeVideoThumbnailDetail;
}

export interface IYoutubeVideoStatistics {
    viewCount: number;
    likeCount: number;
    favoriteCount: number;
    commentCount: number;
}

export interface IYoutubeVideoSnipper {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: IYoutubeVideoThumbnails;
    channelTitle: string;
    tags: string[];
    categoryId: number;
    liveBroadcastContent: string;
    defaultLanguage: string;
    defaultAudioLanguage: string;
}

export interface IYoutubeVideoItem {
    kind?: YoutubeSearchItemKind;
    etag?: string;
    id: string;
    snippet: IYoutubeVideoSnipper;
    statistics: IYoutubeVideoStatistics;
}

export enum YoutubeSearchItemKind {
    CHANNEL = "youtube#channel",
    VIDEO = "youtube#video",
}

export interface IYoutubeSearchItem extends Omit<IYoutubeVideoItem, "id"> {
    id: {
        kind: YoutubeSearchItemKind;
        videoId: string;
    };
}

export interface ISearchVideoResult {
    totalResults: number;
    items: IYoutubeSearchItem[];
}

/* export interface IGetYoutubeVideosResponse {
    kind: string;
    etag: string;
    id: string;
    snippet: IYoutubeVideoSnipper;
    statistics: IYoutubeVideoStatistics;
            contentDetails: {
            duration: PT4M37S,
            dimension: 2d,
            definition: hd,
            caption: true,
            licensedContent: true,
            contentRating: {},
            projection: rectangular
        },
} */
