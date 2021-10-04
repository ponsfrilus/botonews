import { Next, Request, Response } from 'restify';
import { fetchHackernews } from './FetchHackernews';
import { fetchGoEpfl } from './FetchGoEpfl';

const news = async (req: Request, res: Response, next: Next) => {
  let news: BotonewsItem[] = [];
  if (!req.query.src) {
    let HackerNews: BotonewsItem[] = await fetchHackernews(req.query);
    news = news.concat(HackerNews);
  } else {
    const channels = req.query.src.split(',');
    console.log(channels);

    if (channels.includes('hackernews')) {
      console.debug('  ↳ adding hackernews');
      let hackerNews: BotonewsItem[] = await fetchHackernews(req.query);
      news = news.concat(hackerNews);
    }

    if (channels.includes('goepfl')) {
      console.debug('  ↳ adding goepfl');
      let goEpfl: BotonewsItem[] = await fetchGoEpfl(req.query);
      news = news.concat(goEpfl);
    }
  }
  res.send(news);
  next();
};

export default news;
