import { Request, Response } from 'express';

const home = (req: Request, res: Response) => {
  res.end('<html><body><h3>Botonews</h3></body></html>');
};

export default home;
