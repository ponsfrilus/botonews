import { NextFunction, Request, Response } from 'express';

const respond = (req: Request, res: Response, next: NextFunction) => {
  res.send('hello ' + req.params.name);
  next();
};

export default respond;
