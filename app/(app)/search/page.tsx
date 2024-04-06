import { SearchVideos } from "@components/videos/SearchVideos";

export default function SearchPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) {
    return <SearchVideos query={searchParams.q || ""} />;
}
