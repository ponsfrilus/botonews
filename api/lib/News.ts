import { Next, Request, Response } from "restify";

const news = (req: Request, res: Response, next: Next) => {
  res.send(req.query);
  next();
};

export default news;
