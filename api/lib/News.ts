import { Next, Request, Response } from "restify";
import { fetchHackernews } from "./FetchHackernews"

const news = async (req: Request, res: Response, next: Next) => {
  let HackerNews:any[] = await fetchHackernews(req.query)
  res.send(HackerNews);
  next();
};

export default news;
