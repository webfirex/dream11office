type MatchType = {
  uuid: string;
  banner: string;
  title: string;
  subTitle: string;
  date: string;
  description: string;
  ranks: {
    1: {
      prize: string;
      cost: number;
    };
    2: {
      prize: string;
      cost: number;
    };
    3: {
      prize: string;
      cost: number;
    };
  };
};

type WinnerType = {
  prize: string;
  image: string;
  video: string;
};

type BannerType = {
  image: string;
  link: string;
};

type DataType = {
  matches: MatchType[];
  banner: BannerType;
  matchBanner: BannerType;
  hero: {
    videoId: string;
  };
  ticker: {
    text: string;
  };
  winners: WinnerType[];
  result: string[];
};

export const Data: DataType = {
  matches: [
    {
      uuid: "hkjqw-qeqwe-qweqwe-asdsad",
      banner: "https://i.imgur.com/1O9m8gF.png",
      title: "Torneio de CS:GO",
      subTitle: "Torneio de CS:GO",
      date: "01/01/2021",
      description: "Torneio de CS:GO",
      ranks: {
        1: {
          prize: "R$ 500,00",
          cost: 50,
        },
        2: {
          prize: "R$ 300,00",
          cost: 30,
        },
        3: {
          prize: "R$ 200,00",
          cost: 20,
        },
      },
    },
  ],
  banner: {
    image: "https://dream11office.com/public/images/min-ban-6.png",
    link: "https://telegram.me/brijesh11team",
  },
  matchBanner: {
    image: "https://dream11office.com/public/images/min-ban-2.png",
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
      prize: "Won 1 Crore",
      image: "https://picsum.photos/200/300",
      video:
        "https://dream11office.com/public/images/results/videos/video_1.mp4",
    },
    {
      prize: "Won 1 Crore",
      image: "https://picsum.photos/200/300",
      video:
        "https://dream11office.com/public/images/results/videos/video_1.mp4",
    },
    {
      prize: "Won 1 Crore",
      image: "https://picsum.photos/200/300",
      video:
        "https://dream11office.com/public/images/results/videos/video_1.mp4",
    },
  ],
  result: [
    "https://dream11office.com/public/images/winnings/win37.png",
    "https://dream11office.com/public/images/winnings/win37.png",
    "https://dream11office.com/public/images/winnings/win37.png",
  ],
};
