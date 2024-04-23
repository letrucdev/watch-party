import { TrendingVideos } from "@components/videos/TrendingVideos";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Thịnh hành",
};

export default function Home() {
    return (
        <>
            <div className="flex flex-col mb-3">
                <h2 className="text-xl font-semibold">Thịnh hành</h2>
                <p className="text-muted-foreground">
                    Những video thịnh hành ngày hôm nay
                </p>
            </div>
            <TrendingVideos />
        </>
    );
}
