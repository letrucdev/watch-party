import { SearchVideos } from "@components/videos/SearchVideos";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tìm kiếm",
};

export default function SearchPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) {
    return <SearchVideos query={searchParams.q || ""} />;
}
