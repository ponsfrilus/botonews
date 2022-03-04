import Parser from 'rss-parser';

export const fetchWSJ = async (options = {}) => {
  let defaultoptions = {
    number: 4, // Max is 50
  };
  let opt = { ...defaultoptions, ...options };

  type CustomFeed = {
    title: string;
    subtitle: string;
    item_url: URL;
    image_url: URL;
    image_alt: string;
    isoDate: Date;
    url: URL;
    enclosure: any;
    link: URL;
  };
  type CustomItem = {
    title: string;
    subtitle: string;
    item_url: URL;
    image_url: URL;
    image_alt: string;
    isoDate: Date;
    url: URL;
    enclosure: any;
    link: URL;
  };

  const parser: Parser<CustomFeed, CustomItem> = new Parser({});

  const feed = await parser.parseURL('https://feeds.a.dj.com/rss/RSSWorldNews.xml');

  let articles = [];

  for (let i = 0; i != opt.number; i++) {
    let article: BotonewsItem = {
      card_type: 'image',
      src_channel: 'WallStreetJournal',
      title: feed.items[i].title,
      subtitle: feed.items[i].content,
      item_url: new URL(feed.items[i].link),
      image_url: new URL("https://www.nicepng.com/png/detail/155-1550192_wall-street-journal-logo-png.png"),
      image_alt: `Wall Stret Journal image`,
      created_at: feed.items[i].isoDate,
    };
    articles.push(article);
  }

  return articles;
};
