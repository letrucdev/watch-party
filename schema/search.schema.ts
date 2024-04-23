import {z} from "zod";

export const SearchSchema = z.object({
    query: z.string(),
})

export type ISearchSchema = z.infer<typeof SearchSchema>