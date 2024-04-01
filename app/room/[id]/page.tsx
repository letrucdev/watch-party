import { Menu } from "@/components/room/Menu";
import { YoutubePlayer } from "@/components/videos/YoutubePlayer";

export default function RoomPage() {
  return (
    <div className="flex flex-col xl:flex-row">
      <YoutubePlayer
        videoTitle="NHẠC NGHE TRÊN GIƯỜNG #6🎧NHẠC TRẺ REMIX 2024🎧MIXSET HOUSE LAK & DEEP
      HOUSE 2024🎧VIET DEEP 2024"
      />
      <Menu />
    </div>
  );
}
