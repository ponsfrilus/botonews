import { Request, Response } from 'express';

const profile = (req: any, res: Response) => {
  res.render('profile', {user: req.session.passport.user.provider});
};

export default profile;
