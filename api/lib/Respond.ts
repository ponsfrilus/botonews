import { Next, Request, Response } from "restify";

const respond = (req: Request, res: Response, next: Next) => {
  res.send("hello " + req.params.name);
  next();
};

export default respond;
