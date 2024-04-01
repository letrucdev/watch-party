import YouTube from "react-youtube";

interface IYoutubePlayer {
  videoTitle: string;
}

export const YoutubePlayer = ({ videoTitle }: IYoutubePlayer) => {
  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div className="flex flex-col flex-grow">
      <YouTube
        className="w-full aspect-video mb-2"
        iframeClassName="w-full h-full rounded-xl"
        videoId={"zbtbk9hqkhY"}
        opts={opts} // defaults -> ''
      />
      <h2 className="font-semibold line-clamp-2 text-xl">{videoTitle}</h2>
    </div>
  );
};
