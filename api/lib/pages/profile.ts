import { Request, Response } from 'express';

const profile = (req: any, res: Response) => {
  res.render('profile', {user: req.session.passport.user.provider, path: req.path});
};

export default profile;
