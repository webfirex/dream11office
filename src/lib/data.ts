type WinnerType = {
  image: string;
  video: string;
};

type BannerType = {
  image: string;
  link: string;
};

type DataType = {
  banner: BannerType;
  matchBanner: BannerType;
  hero: {
    videoId: string;
  };
  ticker: {
    text: string;
  };
  winners: WinnerType[];
};

export const Data: DataType = {
  banner: {
    image: "/min-ban-6.png",
    link: "https://telegram.me/brijesh11team",
  },
  matchBanner: {
    image: "/min-ban-2.png",
    link: "https://wa.me/+917041508202",
  },
  hero: {
    videoId: "LcSoZUMQ9yI",
  },
  ticker: {
    text: "Call us for More Details : +91 7041508202 / +91 7622996653",
  },
  winners: [
    {
      image: "/win3.png",
      video: "/video_1.mp4",
    },
    {
      image: "/win1.png",
      video: "/video_2.mp4",
    },
    {
      image: "/win2.png",
      video: "/video_3.mp4",
    },
  ],
};
