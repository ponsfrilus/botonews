import { Next, Request, Response } from 'restify';

const home = (req: Request, res: Response) => {
  res.end('<html><body><h3>Botonews</h3></body></html>');
};

export default home;
