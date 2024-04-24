import {z} from "zod";

export const SearchSchema = z.object({
    query: z.string().min(1),
})

export type ISearchSchema = z.infer<typeof SearchSchema>