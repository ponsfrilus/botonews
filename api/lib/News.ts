import { Next, Request, Response } from "restify";
import { fetchHackernews } from "./FetchHackernews";

const news = async (req: Request, res: Response, next: Next) => {
  console.log(req.query.src);
  let news: any = [];

  if (!req.query.src) {
    let HackerNews: any[] = await fetchHackernews(req.query);

    news = news.concat(HackerNews);
  }

  if (req.query.src.includes("hackernews")) {
    let hackerNews: any[] = await fetchHackernews(req.query);
    news = news.concat(hackerNews);
  }

  res.send(news);
  next();
};

export default news;
