export type MatchType = {
  uuid: string;
  banner: string;
  title: string;
  subTitle: string;
  date: string;
  description: string;
  ranks: {
    prize: string;
    cost: number;
  }[];
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
      title: "Brisbane vs Adelaide",
      subTitle: "HEA vs STR",
      date: "2:10pm 22/1/2024",
      description:
        "इस मैच की 1 से लेकर 3 Rank तक आप Booking कर सकते हो। अलग अलग Rank का Booking charges अलग अलग है। आपकी Winnings 100% होगी। ये Booking सीधे Dream 11 office से की जा रही है। आप जो भी Rank Book करोगे उसका Winning amount मैच खत्म होने के बाद सीधे आपके Dream 11 wallet में भेज दिया जायेगा। आप अपने wallet से पैसा सीधे अपने बैंक में Transfer कर सकते है।",
      ranks: [
        {
          prize: "₹1 Crore",
          cost: 1499,
        },
        {
          prize: "₹22 Lakh",
          cost: 1299,
        },
        {
          prize: "₹7.5 Lakh",
          cost: 999,
        },
      ],
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
