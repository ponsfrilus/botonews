import Parser from 'rss-parser';

export const fetchNYtimes = async (options = {}) => {
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

  const feed = await parser.parseURL('https://rss.nytimes.com/services/xml/rss/nyt/World.xml');

  let articles = [];

  for (let i = 0; i != opt.number; i++) {
    let article: BotonewsItem = {
      src_channel: 'NewYorkTimes',
      title: feed.items[i].title,
      subtitle: feed.items[i].content,
      item_url: new URL(feed.items[i].link),
      image_url: new URL("https://static01.nyt.com/vi-assets/images/share/1200x675_nameplate.png"),
      image_alt: `New York Times image`,
      created_at: feed.items[i].isoDate,
    };
    articles.push(article);
  }

  return articles;
};
