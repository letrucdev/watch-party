import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE } from "@/lib/constants";
import { z } from "zod";

export const UploadAvatarSchema = z.object({
    avatar: z
        .instanceof(File)
        .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
            message: "Định dạng file phải là .png hoặc .jpg",
        })
        .refine((file) => !file || file.size <= MAX_IMAGE_SIZE, {
            message: "Dung lượng file ảnh không được vượt quá 5mb",
        }),
});

export const AddVideoToPlaylistSchema = z.object({
    videoId: z.string(),
    videoTitle: z.string(),
    thumbnail: z.string(),
    channelTitle: z.string(),
});

export const SearchVideoSchema = z.object({
    query: z.string().refine((query) => query.trim().length > 0),
});

export type ISearchVideoForm = z.infer<typeof SearchVideoSchema>;
export type IAddVideoToPlaylist = z.infer<typeof AddVideoToPlaylistSchema>;
