import { IVideo } from "@/types/video.type";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { ItemSkeleton } from "./ItemSkeleton";

const PlayListItem = dynamic(() => import("./PlayListItem"), {
    loading: () => <ItemSkeleton />,
});

export default function PlayList() {
    const playlist: IVideo[] = useMemo(() => {
        return [
            {
                id: 1,
                thumbnail: "/assets/images/image-1.jpg",
                videoTitle: "Introduction to JavaScript",
                uploader: "CodeMaster",
                viewCount: 1000,
                uploadedAt: "2024-03-15T08:00:00Z",
            },
            {
                id: 2,
                thumbnail: "/assets/images/image-1.jpg",
                videoTitle: "Python Basics Tutorial",
                uploader: "PythonGuru",
                viewCount: 1500,
                uploadedAt: "2024-03-16T10:30:00Z",
            },
            {
                id: 3,
                thumbnail: "/assets/images/image-1.jpg",
                videoTitle: "HTML & CSS Crash Course",
                uploader: "WebWizard",
                viewCount: 2000,
                uploadedAt: "2024-03-17T12:45:00Z",
            },
            {
                id: 4,
                thumbnail: "/assets/images/image-1.jpg",
                videoTitle: "React.js Tutorial for Beginners",
                uploader: "ReactRocks",
                viewCount: 1800,
                uploadedAt: "2024-03-18T15:20:00Z",
            },
            {
                id: 5,
                thumbnail: "/assets/images/image-1.jpg",
                videoTitle: "Machine Learning Fundamentals",
                uploader: "AIExplained",
                viewCount: 2500,
                uploadedAt: "2024-03-19T17:10:00Z",
            },
            {
                id: 6,
                thumbnail: "/assets/images/image-1.jpg",
                videoTitle: "Java Programming Basics",
                uploader: "JavaMaster",
                viewCount: 2200,
                uploadedAt: "2024-03-20T20:00:00Z",
            },
            {
                id: 7,
                thumbnail: "/assets/images/image-1.jpg",
                videoTitle: "Angular Crash Course",
                uploader: "AngularNinja",
                viewCount: 1900,
                uploadedAt: "2024-03-21T22:30:00Z",
            },
            {
                id: 8,
                thumbnail: "/assets/images/image-1.jpg",
                videoTitle: "Node.js Tutorial Series",
                uploader: "NodeHero",
                viewCount: 2100,
                uploadedAt: "2024-03-22T09:15:00Z",
            },
            {
                id: 9,
                thumbnail: "/assets/images/image-1.jpg",
                videoTitle: "C++ Programming Basics",
                uploader: "CppGeek",
                viewCount: 2300,
                uploadedAt: "2024-03-23T11:45:00Z",
            },
            {
                id: 10,
                thumbnail: "/assets/images/image-1.jpg",
                videoTitle: "Data Structures & Algorithms Explained",
                uploader: "CodeNerd",
                viewCount: 2400,
                uploadedAt: "2024-03-24T14:20:00Z",
            },
            {
                id: 11,
                thumbnail: "/assets/images/image-1.jpg",
                videoTitle: "CSS Flexbox Tutorial",
                uploader: "FlexboxFanatic",
                viewCount: 2600,
                uploadedAt: "2024-03-25T16:30:00Z",
            },
            {
                id: 12,
                thumbnail: "/assets/images/image-1.jpg",
                videoTitle: "PHP Basics Crash Course",
                uploader: "PhpPro",
                viewCount: 2800,
                uploadedAt: "2024-03-26T18:45:00Z",
            },
            {
                id: 13,
                thumbnail: "/assets/images/image-1.jpg",
                videoTitle: "Vue.js Tutorial for Beginners",
                uploader: "VueVirtuoso",
                viewCount: 2700,
                uploadedAt: "2024-03-27T21:00:00Z",
            },
            {
                id: 14,
                thumbnail: "/assets/images/image-1.jpg",
                videoTitle: "SQL Database Fundamentals",
                uploader: "SQLSavvy",
                viewCount: 3000,
                uploadedAt: "2024-03-28T10:00:00Z",
            },
            {
                id: 15,
                thumbnail: "/assets/images/image-1.jpg",
                videoTitle: "Bootstrap Crash Course",
                uploader: "BootstrapBuddy",
                viewCount: 2900,
                uploadedAt: "2024-03-29T12:30:00Z",
            },
        ];
    }, []);
    return (
        <ScrollArea className="flex flex-col flex-grow">
            {playlist.map((video) => {
                return (
                    <PlayListItem
                        key={video.id}
                        id={video.id}
                        thumbnail={video.thumbnail}
                        uploader={video.uploader}
                        videoTitle={video.videoTitle}
                    />
                );
            })}
        </ScrollArea>
    );
}
