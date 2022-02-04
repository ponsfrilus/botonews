import { Request, Response } from 'express';

const home = (req: any, res: Response) => {
  if(req.user) {
    res.render('homepage', {user: req.session.passport.user.provider} );
  } else {
    res.render('homepage',  {user: {}});
  }
};

export default home;
