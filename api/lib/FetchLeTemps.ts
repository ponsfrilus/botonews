import Parser from 'rss-parser';

export const fetchLeTemps = async (options = {}) => {
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

  const feed = await parser.parseURL('https://www.letemps.ch/feed');

  let articles = [];

  for (let i = 0; i != opt.number; i++) {
    let article: BotonewsItem = {
      card_type: 'image',
      src_channel: 'LeTemps',
      title: feed.items[i].title,
      subtitle: feed.items[i].content,
      item_url: new URL(feed.items[i].link),
      image_url: new URL(feed.items[i].enclosure.url),
      image_alt: `Le Temps image`,
      created_at: feed.items[i].isoDate,
    };
    articles.push(article);
  }

  return articles;
};
