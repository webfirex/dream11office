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
    link: "https://t.me/+3FMI1LP_nPZhMmJl",
  },
  matchBanner: {
    image: "/min-ban-6.png",
    link: "https://t.me/+3FMI1LP_nPZhMmJl",
  },
  hero: {
    videoId: "LcSoZUMQ9yI",
  },
  ticker: {
    text: "Call us for More Details  :  +91 9999999999 / +91 9999999999 / +91 9999999999 / +91 9999999999",
  },
  winners: [
    {
      image: "/win3.png",
      video: "https://someshthakre.com/videos/w3.mp4",
    },
    {
      image: "/win1.png",
      video: "https://someshthakre.com/videos/w1.mp4",
    },
    {
      image: "/win2.png",
      video: "https://someshthakre.com/videos/w2.mp4",
    },
  ],
};
