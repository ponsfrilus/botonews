import { Next, Request, Response } from 'restify';
import { fetchHackernews } from './FetchHackernews';
import { fetchGoEpfl } from './FetchGoEpfl';
import { fetchActu } from './FetchActu';
import { fetchTweets } from './FetchTweets';

const news = async (req: Request, res: Response, next: Next) => {
  let news: BotonewsItem[] = [];
  if (!req.query.src) {
    let hackerNews: BotonewsItem[] = await fetchHackernews(req.query);
    let goEpfl: BotonewsItem[] = await fetchGoEpfl(req.query);
    let actus: BotonewsItem[] = await fetchActu(req.query);

    news = news.concat(hackerNews, goEpfl, actus);
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

    if (channels.includes('actu')) {
      console.debug(' ↳ adding actu');
      let actus: BotonewsItem[] = await fetchActu(req.query);
      news = news.concat(actus);
    }

    if (channels.includes('php_ceo')) {
      console.debug(' ↳ adding php_ceo tweets');
      try {
        let php_ceo: BotonewsItem[] = await fetchTweets({ username: 'php_ceo', ...req.query });
        news = news.concat(php_ceo);
      } catch (e) {
        console.error(e);
      }
    }
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(news);
  next();
};

export default news;
